import { Request, Response } from "express";
import orderModel, { Order } from "../../Order/models/orderModel";

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