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

// export const updateOrder = (req: Request, res: Response): void => {
//   const orderId = req.params.orderId;
//   const newStatus = req.body.status;

//   orderModel.updateOne(
//     { _id: orderId },
//     { $set: { status: newStatus } }
//   )
//     .exec()
//     .then(() => {
//       orderModel.findOne({ _id: orderId })
//         .exec()
//         .then((order: any) => {
//           const mechId: string = order.mechanicId;
//           console.log("Mechanic Id: " + mechId);
//         console.log("===>",mechId);
//           const updateUserStatus = (status: string) => {
//             userModel.updateOne(
//               { _id: mechId },
//               { $set: { status } }
//             )
//               .then(() => {
//                 console.log(`Member Status: ${status}`);
//               })
//               .catch((err: any) => {
//                 console.log(`Member Status Error: ${err}`);
//               });
//           };

//           if (newStatus === "ACCEPTED") {
//             updateUserStatus("NOT-AVAILABLE");
//           } else if (newStatus === "COMPLETED" || newStatus === "REJECT") {
//             updateUserStatus("AVAILABLE");
//           }

//           res.status(200).json({ message: "Request Updated Successfully" });
//         })
//         .catch((err: any) => {
//           console.log("Find Order Error: " + err);
//           res.status(500).json({ error: "Internal Server Error" });
//         });
//     })
//     .catch((err: any) => {
//       console.log("Order Update Error: " + err);
//       res.status(500).json({ error: "Internal Server Error" });
//     });
// };

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.orderId;
  const newStatus = req.body.status;

  try {
    await orderModel.updateOne(
      { _id: orderId },
      { $set: { status: newStatus } }
    ).exec();

    const order: any = await orderModel.findOne({ _id: orderId }).exec();
    const mechId: string = order.mechanicId;
    console.log("Mechanic Id: " + mechId);

    const updateUserStatus = async (status: string) => {
      await userModel.updateOne(
        { _id: mechId },
        { $set: { status } }
      ).exec();
      console.log(`Member Status: ${status}`);
    };

    if (newStatus === "ACCEPTED") {
      await updateUserStatus("NOT-AVAILABLE");
    } else if (newStatus === "COMPLETED" || newStatus === "REJECTED") {
      await updateUserStatus("AVAILABLE");
    }

    res.status(200).json({ message: "Request Updated Successfully" });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
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