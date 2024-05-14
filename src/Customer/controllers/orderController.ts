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


// export const addOrder = async (req: Request<any, any, OrderRequestBody>, res: Response) => {

//   const customer:  User  | null = await userModel.findById(req.params.customerId);
//   const customerName: string | undefined = customer?.firstName;

//   const order = new OrderModel({
//     customerId: req.params.customerId,
//     customerName: customerName,
//     carName: req.body.carName,
//     carNumber: req.body.carNumber,
//     custAddress: req.body.custAddress,
//     serviceName: req.body.serviceName,
//     servicePrice: req.body.servicePrice,
//   });

//   order
//     .save()
//     .then((result) => {
//       console.log("Order Placed: " + result);
//       res.status(201).json({
//         message: "Thank you for your order.",
//         result,
//       });
//     })
//     .catch((err: string) => {
//       console.log("Placing Order Error" + err);
//       res.status(500).json({
//         error: err,
//       });
//     });
//   customer?.orders.push(order?._id);

//   await userModel.updateOne({_id:customer?._id},{$set:{orders:customer?.orders}});
// };




// Global variable to keep track of the last assigned mechanic index
let lastAssignedMechanicIndex = 0;

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { carName, carNumber, custAddress, serviceName, servicePrice } = req.body;

    // Fetch all available mechanics
    const availableMechanics = await userModel.find({ status: 'AVAILABLE', accountType: 'Mechanic' });

    if (availableMechanics.length === 0) {
      return res.status(400).json({ error: 'No available mechanics at the moment' });
    }

    // Determine the next mechanic using round-robin logic
    const nextMechanic = availableMechanics[lastAssignedMechanicIndex % availableMechanics.length];
    lastAssignedMechanicIndex++;

    const order = new OrderModel({
      customerId: req.params.customerId,
      customerName: req.body.customerName,
      carName,
      carNumber,
      custAddress,
      serviceName,
      servicePrice,
      mechanicName: nextMechanic.mechName,
      mechanicId: nextMechanic._id,
      status: 'PENDING'
    });

    console.log("nextMechanic", nextMechanic.mechName);
    console.log("order", order);


    await order.save();

    await userModel.findByIdAndUpdate(nextMechanic._id, { status: 'NOT-AVAILABLE' });

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
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



