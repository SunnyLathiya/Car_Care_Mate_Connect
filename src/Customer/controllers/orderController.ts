import { Request, Response } from 'express';
import OrderModel from '../../Order/models/orderModel' // Adjust the path if necessary
import userModel from '../../Auth/models/userModel';
import { User } from '../../Auth/models/userModel';
import mailSender from '../../utils/mailSender';


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
  const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000).toString();
  return `ORD${randomFiveDigitNumber}`;
}

export const addOrder = async (req: Request, res: Response) => {
  try {
    const { carName, carNumber, custAddress, serviceName, servicePrice } = req.body;

    const user = await userModel.findById(req.params.customerId);

    const availableMechanics = await userModel.find({ status: 'AVAILABLE', accountType: 'Mechanic' });

    if (availableMechanics.length === 0) {
      return res.status(400).json({ message: 'No available mechanics at the moment' });
    }

    const nextMechanic = availableMechanics[lastAssignedMechanicIndex % availableMechanics.length];
    lastAssignedMechanicIndex++;

    const orderId = generateRandomOrderId();

    const order = new OrderModel({
      customerId: req.params.customerId,
      customerName: user?.firstName,
      carName,
      carNumber,
      custAddress,
      serviceName,
      servicePrice,
      mechanicName: nextMechanic.mechName,
      mechanicId: nextMechanic._id,
      orderId,
      status: 'PENDING'
    });

    await order.save();

    await userModel.findByIdAndUpdate(nextMechanic._id, { status: 'NOT-AVAILABLE' });

        const email : any = user?.email;
        const title = "Order Update Notification";
        const body = `Your order with ID ${order._id} has been updated.You're order currently in 'PLACED' state. Your order handle ${nextMechanic?.id}-${nextMechanic?.firstName}.........`;
    
         const cus = await mailSender(email, title, body);

         console.log("cus", cus)
    
        const emailMech : any = nextMechanic?.email; 
        const titleMech : any = "New Order!";
        const bodyMech : any = `You have to handle this order ${orderId}, if requere then you can contact with ${user?.email}`;
    
        const mech = await mailSender(emailMech, titleMech, bodyMech);
        console.log("mech", mech)

  

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



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