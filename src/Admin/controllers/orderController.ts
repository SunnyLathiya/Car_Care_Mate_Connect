import { Request, Response } from 'express';
import orderModel, { Order } from '../../Order/models/orderModel'
import userModel from '../../Auth/models/userModel';
import mailSender from '../../utils/mailSender';


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
// export const updateOrder = async(req: Request, res: Response) => {
//   const mechanic = await userModel.findById(req.body.mechanicId);
//   const orderId: string = req.params.orderId;
//    const newOrder =orderModel.updateOne(
//     { _id: orderId },
//     { $set: { status: "PENDING", mechanicId: req.body.mechanicId } }
//   )
//     .exec()
//     .then((response) => {
//       res.status(200).json({
//         message: "Order Successfully Assign to Mechanic",
//         newOrder
//       });
//     })
//     .catch((err: any) => {
//       console.error(err);
//       res.status(500).json({
//         error: err,
//       });
//     });

//     mechanic?.orders.push(orderId);

//     await userModel.updateOne({_id:mechanic?._id},{$set:{orders:mechanic?.orders}});
    

// };


export const updateOrder = async(req: Request, res: Response) => {
  try {
    const mechanic = await userModel.findById(req.body.mechanicId);
    const orderId = req.params.orderId;

    // Update the order status and mechanicId
    const updatedOrder = await orderModel.updateOne(
      { _id: orderId },
      { $set: { status: "PENDING", mechanicId: req.body.mechanicId } }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Add orderId to mechanic's orders list
    mechanic?.orders.push(orderId);
    await userModel.updateOne({ _id: mechanic?._id }, { $set: { orders: mechanic?.orders } });

    // Find the user associated with the order
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const user = await userModel.findById(order.customerId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("90", user._id)

    // Send email notification to the user
    const email = user.email;
    const title = "Order Update Notification";
    const body = `Your order with ID ${orderId} has been updated.You're order currently in 'PLACED' state. Your order handle ${mechanic?.id}-${mechanic?.firstName}.........`;

    await mailSender(email, title, body);

    const emailMech : any = mechanic?.email; 
    const titleMech : any = "New Order!";
    const bodyMech : any = `You have to handle this order ${orderId}, if requere then you can contact with ${user.email}`;

    await mailSender(emailMech, titleMech, bodyMech);

    // Send success response
    res.status(200).json({
      message: "Order Successfully Assigned to Mechanic",
      updatedOrder
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
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

  
  export const findCompletedOrdersProfit = async (req: Request, res: Response) => {
    try {
      // Find all completed orders
      const completedOrders: Order[] = await orderModel.find({ status: "COMPLATED" }).exec();

      if (completedOrders.length === 0) {
        return res.status(404).json({
          message: "No completed orders found",
        });
      }
  
      const totalServicePrice = completedOrders.reduce((total, order) => total + order.servicePrice, 0);
  
      res.status(200).json({
        totalServicePrice,
      });
    } catch (err) {
      console.error("Find All Completed Orders sum Error: ", err);
      res.status(500).json({
        error: "Internal Server Error",
      });
    }
  };

  export const allOrders = (req: Request, res: Response): void => {
    orderModel.find({})
    .exec()
    .then((response: string | any[]) => {
      if (response.length === 0) {
        res.status(200).json({
          message: "No Orders!!!",
        });
      } else {
        res.status(200).json({
          message: "all orders",
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



export const AvailableMechanics = async(req: Request, res: Response) => {
  try{

    const availableMechanics = await userModel.find( { status:'AVAILABLE', accountType:'Mechanic'});


    // console.log("Mechanic IDs:", mechanicIds);
     
    if (!availableMechanics) {
      return res.status(201).json({
        success: true,
        message: "currently not any mechanics available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Available Mechanics List",
      data: availableMechanics
    });

  }catch(error){
    return res.status(200).json({
      success: false,
      message: "Error in fetch All Available Mechanic fetch!",
      error: error
    });
  }
}



  
  

