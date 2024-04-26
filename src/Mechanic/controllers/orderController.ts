import { Request, Response } from 'express';
import orderModel, {Order} from '../../Order/models/orderModel';
import userModel from '../../Auth/models/userModel';

export const findInProcessOrders = (req: Request, res: Response): void => {
  orderModel.find({
    $or: [
      { mechanicId: req.params.mechId, status: "IN-PROCESS" },
      { mechanicId: req.params.mechId, status: "ACCEPTED" },
      { mechanicId: req.params.mechId, status: "PENDING" },
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


// ACCEPTED / COMPLETED  / REJECTED
export const updateOrder = (req: Request, res: Response): void => {
  orderModel.updateOne(
    { _id: req.params.orderId },
    { $set: { status: req.body.status } }
  )
    .exec()
    .then((response: any) => {
      orderModel.findOne({ _id: req.params.orderId })
        .exec()
        .then((obj: any) => {
          const mechId: string = obj.mechanicId;
          console.log("Mechanic Id: " + mechId);
          if (req.body.status === "ACCEPTED") {
            userModel.updateOne(
              { _id: obj.mechanicId },
              {
                $set: { status: "NOT AVAILABLE" },
              }
            )
              .then((response: any) => {
                console.log("Member Status: NOT AVAILABLE");
              })
              .catch((err: any) => {
                console.log("Member Status Error: " + err);
              });
          } else {
            userModel.updateOne(
              { _id: obj.mechanicId },
              {
                $set: { status: "AVAILABLE" },
              }
            )
              .then((response: any) => {
                console.log("Member Status: AVAILABLE");
              })
              .catch((err: any) => {
                console.log("Member Status Error: " + err);
              });
          }
        })
        .catch((err: any) => {
          console.log("Find Order Error: " + err);
        });
      console.log("Order Updated Successfully");
      res.status(200).json({
        message: "Request Updated Successfully",
      });
    })
    .catch((err: any) => {
      console.log("Order Update error: " + err);
      res.status(500).json({ "Order Update error ": err });
    });
};

export const findMyOrders = (req: Request, res: Response): void => {
  orderModel.find({ mechanicId: req.params.mechId })
    .exec()
    .then((response: Order[]) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.status(200).json({ orders: response });
      }
    })
    .catch((err: any) => {
      console.log("Find All Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};