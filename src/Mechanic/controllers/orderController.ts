import { Request, Response } from "express";
import orderModel, { Order } from "../../Order/models/orderModel";
import userModel from "../../Auth/models/userModel";
import mailSender from "../../utils/mailSender";
import { mauth } from "../../config/firebaseConnection";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51PHo5FSHLSjFfm6ikkeiKl78yhkg02wxfSZBwC6r7AKROns55LHBgCgG5rrhcpZgulUZc2mBpspkxQHgnMU98YIe00HNnGGuOs",
  {
    apiVersion: "2024-04-10",
  }
);

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  try {
    await orderModel
      .updateOne(
        { _id: orderId },
        { $set: { status: newStatus, lastUpdated: new Date() } }
      )
      .exec();

    const order: any = await orderModel.findOne({ _id: orderId }).exec();
    const mechId: string = order.mechanicId;
    const customerId: string = order.customerId;

    const updateUserStatus = async (status: string) => {
      await userModel
        .updateOne({ _id: mechId }, { $set: { status } }, { new: true })
        .exec();
    };
    if (newStatus === "ACCEPTED") {
      await updateUserStatus("NOT-AVAILABLE");
    } else if (newStatus === "REJECT") {
      stripe.refunds.create({
        payment_intent: "pi_3PKCOhSHLSjFfm6i0mXT9f8wy",
      });
      await updateUserStatus("AVAILABLE");
    } else if (newStatus === "COMPLETED") {
      await updateUserStatus("AVAILABLE");
    }

    const user: any = await userModel.findOne({ _id: customerId }).exec();
    const userEmail: string = user.email;

    const emailTitle = "Order Status Update";
    const emailBody = `Your order has been updated and is currently in the ${newStatus} state.`;
    await mailSender(userEmail, emailTitle, emailBody);

    res.status(200).json({ message: "Request Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const findInProcessOrders = (req: Request, res: Response): void => {

  console.log("req.params", req.params._id)
  orderModel.find({ mechanicId: req.params._id,
    $or: [
      { mechanicId: req.params._id, status: "IN-PROCESS" },
      { mechanicId: req.params._id, status: "ACCEPTED" },
      { mechanicId: req.params._id, status: "PENDING" },
    ],
  })
    .exec()
    .then((response: Order[]) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          response,
        });
      }
    })
    .catch((err: any) => {
      console.log("Find All Placed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

export const findMyOrders = async (
  req: Request,
  res: Response
): Promise<void> => {

  console.log("1", req.params.mechId)

  try {
    const response: Order[] = await orderModel
      .find({ mechanicId: req.params.mechId })
      .exec();

      console.log("2", response)

    if (response.length === 0) {
      res.status(200).json({
        message: "No Orders are available",
      });
    } else {
      res.status(200).json({ orders: response });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const savetoken = async (req: Request, res: Response) => {
  const { token, mechanicId } = req.body;
  try {
    await userModel.findByIdAndUpdate(mechanicId, { fcmToken: token });
    res.status(200).json({ message: "Token saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving token", error });
  }
};

export const notificationSend = async (req: Request, res: Response) => {
  try {
    await mauth.messaging().send({
      token: "",
      notification: {
        title: "testing 1",
        body: "hello",
      },
    });
    return res.status(200).send("Notification send successfully");
  } catch (error) {}
};

export const notification = async (req: Request, res: Response) => {
  const { fcmToken, customerName, title, body } = req.body;
  try {
    const abc = await mauth.messaging().send({
      token: fcmToken,
      notification: {
        title: "ORDER UPDATE",
        body: `${body} ${customerName}`,
      },
    });
    return res.status(200).send("Notification Sent Successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
};
