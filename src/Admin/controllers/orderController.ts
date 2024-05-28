import { Request, Response } from "express";
import orderModel, { Order } from "../../Order/models/orderModel";
import mailSender from "../../utils/mailSender";
import userModel from "../../Auth/models/userModel";

export const findPlacedOrders = async ( req: Request, res: Response): Promise<void> => {
  try {
    const response = await orderModel.find({ status: "PLACED" }).exec();

    if (response.length === 0) {
      res.status(200).json({
        message: "No Orders are available",
      });
    } else {
      res.status(200).json({
        message: "All placed orders",
        response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const mechanic = await userModel.findById(req.body.mechanicId);
    const orderId = req.params.orderId;

    if (!mechanic) {
      return res.status(404).json({ message: "Mechanic not found" });
    }

    await userModel.updateOne({ _id: mechanic._id }, { $set: { status: "NOT-AVAILABLE" } });

    const updatedOrder = await orderModel.updateOne(
      { _id: orderId },
      { $set: { status: "PENDING", mechanicId: req.body.mechanicId, mechanicName: mechanic.mechName } }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    mechanic.orders.push(orderId);
    await userModel.updateOne({ _id: mechanic._id }, { $set: { orders: mechanic.orders } });

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const user = await userModel.findById(order.customerId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const email = user.email;
    const title = "Order Update Notification";
    const body = `Your order with ID ${orderId} has been updated. Your order is currently in 'PENDING' state. Your order is handled by ${mechanic.firstName}.`;

    await mailSender(email, title, body);

    const emailMech: any = mechanic.email;
    const titleMech: any = "New Order!";
    const bodyMech: any = `You have been assigned a new order with ID ${orderId}. If required, you can contact the customer at ${user.email}.`;

    await mailSender(emailMech, titleMech, bodyMech);

    res.status(200).json({
      message: "Order Successfully Assigned to Mechanic",
      updatedOrder
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
};


export const findCompletedOrders = async ( req: Request, res: Response): Promise<void> => {
  try {
    const response = await orderModel.find({ status: "COMPLETED" }).exec();

    if (response.length === 0) {
      res.status(200).json({
        message: "No COMPLETED Orders are available",
      });
    } else {
      res.status(200).json({
        completedOrders: response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


export const findCompletedOrdersProfit = async (req: Request, res: Response) => {
  try {
    const completedOrders: Order[] = await orderModel.find({ status: "COMPLATED" }).exec();

    if (completedOrders.length === 0) {
      return res.status(404).json({
        message: "No completed orders found",
      });
    }

    const totalServicePrice = completedOrders.reduce((total, order) => total + order.servicePrice, 0 );

    res.status(200).json({
      totalServicePrice,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const allOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await orderModel.find({}).exec();

    if (response.length === 0) {
      res.status(200).json({
        message: "No Orders !!!",
      });
    } else {
      res.status(200).json({
        message: "All orders",
        response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};