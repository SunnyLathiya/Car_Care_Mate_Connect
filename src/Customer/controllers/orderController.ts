import { Request, Response } from "express";
import OrderModel from "../../Order/models/orderModel";
import userModel from "../../Auth/models/userModel";
import mailSender from "../../utils/mailSender";
import { Stripe } from "stripe";
import fetch from "cross-fetch";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../../..", "config.env");
dotenv.config({ path: envPath });

const stripe = new Stripe(
  "sk_test_51PHo5FSHLSjFfm6ikkeiKl78yhkg02wxfSZBwC6r7AKROns55LHBgCgG5rrhcpZgulUZc2mBpspkxQHgnMU98YIe00HNnGGuOs",
  {
    apiVersion: "2024-04-10",
    timeout: 30000, // 30 seconds
    maxNetworkRetries: 2, // Retry twice before failing
  }
);
interface OrderRequestBody {
  customerId: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
}

let lastAssignedMechanicIndex = 0;

function generateRandomOrderId(): string {
  const randomFiveDigitNumber = Math.floor(
    10000 + Math.random() * 90000
  ).toString();
  return `ORD${randomFiveDigitNumber}`;
}

export const addOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { carName, carNumber, custAddress, serviceName, servicePrice } =
      req.body;

    const user = await userModel.findById(req.params.customerId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const encodedAddress = encodeURIComponent(custAddress);
    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;

    console.log("Encoded Address:", encodedAddress);
    console.log("Nominatim URL:", nominatimUrl);

    const response = await fetch(nominatimUrl);
    const data: any = await response.json();

    if (!data || data.length === 0) {
      res.status(400).json({ message: "Invalid address" });
      return;
    }

    const { lat, lon } = data[0];

    const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`;

    const availableMechanics = await userModel.find({
      status: "AVAILABLE",
      accountType: "Mechanic",
    });


    console.log("224", availableMechanics)

    if (availableMechanics.length === 0) {
      res.status(400).json({ message: "No available mechanics at the moment" });
      return;
    }

    const nextMechanic =
      availableMechanics[lastAssignedMechanicIndex % availableMechanics.length];
    lastAssignedMechanicIndex++;

    const orderId = generateRandomOrderId();




    console.log("222", orderId)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/customer/mybookings`,
      cancel_url: `http://localhost:3000/customer/cushome`,
      customer_email: user.email,
      client_reference_id: orderId,
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
              description: "Car Service Booking",
            },
            unit_amount: servicePrice * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId: orderId,
      },
    });

    console.log("223", session)

    const order = new OrderModel({
      customerId: req.params.customerId,
      customerName: user.firstName,
      fcmToken: user.fcmToken,
      carName,
      carNumber,
      custAddress,
      serviceName,
      servicePrice,
      mechanicName: nextMechanic.mechName,
      mechanicId: nextMechanic._id,
      orderId,
      googleMapsUrl: mapUrl,
      status: "PENDING",
      paymentStatus: "PENDING",
    });

    await order.save();

    console.log("333", order)

    await userModel.findByIdAndUpdate(nextMechanic._id, {
      status: "NOT-AVAILABLE",
      $addToSet: { orders: order._id },
    });

    const email = user.email;
    const title = "Order Update Notification";
    const body = `Your order with ID ${order._id} has been updated. Your order is currently in 'PLACED' state. Your order will be handled by ${nextMechanic.id}-${nextMechanic.firstName}.`;

    await mailSender(email, title, body);

    const emailMech = nextMechanic.email;
    const titleMech = "New Order!";
    const bodyMech = `You have to handle this order ${orderId}, if required you can contact ${user.email}.`;

    await mailSender(emailMech, titleMech, bodyMech);

    res.status(201).json({
      message: "Order placed successfully",
      url: session.url,
    });
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const webhook = async (request: Request, response: Response) => {
  const sig = request.headers["stripe-signature"];
  const endpointSecret = process.env.WEBHOOK_SK;

  let event;
  try {
    if (sig && endpointSecret) {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
  } catch (err: any) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event?.type) {
    case "checkout.session.completed":
      const paymentIntent = event.data.object;
      const orderId = paymentIntent?.metadata?.orderId;

      try {
        const order = await OrderModel.findOne({ orderId });
        if (order) {
          order.paymentStatus = "PAID";
          await order.save();
        } else {
        }
      } catch (err: any) {
        throw new Error(err.message);
      }

      break;
    default:
  }

  response.send();
};

export const findMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await OrderModel.find({
      customerId: req.params.customerId,
    }).exec();

    if (orders.length === 0) {
      res.status(200).json({
        message: "No Orders",
      });
    } else {
      res.status(200).json({
        orders: orders,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};
