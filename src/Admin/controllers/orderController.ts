import { Request, Response } from 'express';
import orderModel from '../../Order/models/orderModel'
import userModel from '../../Auth/models/userModel';


export const findPlacedOrders = (req: Request, res: Response): void => {
    orderModel.find({ status: "PLACED" })
    .exec()
    .then((response: string | any[]) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({
          message: "all placed orders",
          response,
        });
      }
    })
    .catch((err: any) => {
      console.error("Find All Placed Orders Error: ", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    });
};

// Send Order to Mechanic
export const updateOrder = async(req: Request, res: Response) => {
  const mechanic = await userModel.findById(req.body.mechanicId);
  const orderId: string = req.params.orderId;
   const newOrder =orderModel.updateOne(
    { _id: orderId },
    { $set: { status: "PENDING", mechanicId: req.body.mechanicId } }
  )
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Order Successfully Assign to Mechanic",
        newOrder
      });
    })
    .catch((err: any) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });


    mechanic?.orders.push(orderId);

    await userModel.updateOne({_id:mechanic?._id},{$set:{orders:mechanic?.orders}});
    


};


// Find Completed Orders
export const findCompletedOrders = (req: Request, res: Response) => {
    orderModel.find({ status: "COMPLATED" })
      .exec()
      .then((response) => {
        if (response.length === 0) {
          res.status(200).json({
            message: "COMPLATED Orders are available",
          });
        } else {
          res.status(200).json({
            completedOrder: response,
          });
        }
      })
      .catch((err: any) => {
        console.log("Find All Completed Orders Error: " + err);
        res.status(500).json({
          error: err,
        });
      });
  };


