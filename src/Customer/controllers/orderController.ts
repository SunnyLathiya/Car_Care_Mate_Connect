import { Request, Response } from 'express';
import OrderModel from '../../Order/models/orderModel' // Adjust the path if necessary
import userModel from '../../Auth/models/userModel';
import { User } from '../../Auth/models/userModel';


interface OrderRequestBody {
  customerId: string;
  customerName: string;
  carName: string;
  carNumber: string;
  custAddress: string;
  serviceName: string;
  servicePrice: number;
}

// TO place an Order
export const addOrder = async (req: Request<any, any, OrderRequestBody>, res: Response) => {

  const customer:  User  | null = await userModel.findById(req.params.customerId);
  const customerName: string | undefined = customer?.firstName;

  const order = new OrderModel({
    customerId: req.params.customerId,
    customerName: customerName,
    carName: req.body.carName,
    carNumber: req.body.carNumber,
    custAddress: req.body.custAddress,
    serviceName: req.body.serviceName,
    servicePrice: req.body.servicePrice,
  });

  order
    .save()
    .then((result) => {
      console.log("Order Placed: " + result);
      res.status(201).json({
        message: "Thank you for your order.",
        result,
      });
    })
    .catch((err: string) => {
      console.log("Placing Order Error" + err);
      res.status(500).json({
        error: err,
      });
    });
  customer?.orders.push(order?._id);

  await userModel.updateOne({_id:customer?._id},{$set:{orders:customer?.orders}});
};


// Find My Orders
export const findMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await OrderModel.find({ customerId: req.params.customerId }).exec();

    if (orders.length === 0) {
      res.status(200).json({
        message: 'No Orders',
      });
    } else {
      res.status(200).json({
        orders: orders,
      });
    }
  } catch (error: any) {
    console.log('Find My Orders Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};



