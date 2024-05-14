import { Request, Response } from 'express';
import userModel from '../../Auth/models/userModel';

export const findAvailable = async (req: Request, res: Response): Promise<void> => {
  try {
    const mechanicsList = await userModel.find({accountType:"Mechanic", status:"AVAILABLE" }).exec();
    if (mechanicsList.length === 0) {
      res.status(200).json({
        message: "No Mechanics are Available",
      });
    } else {
      res.status(200).json({
        message: "List of All Available Mechanics",
        mechanicsList,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const allmechanicsDetails = await userModel.find({accountType: "Mechanic"}).select("username email status").exec();

    if (allmechanicsDetails.length === 0) {
      res.status(200).json({
        message: "Add a Mechanic",
      });
    } else {
      res.status(200).json({
        message: "List of All Mechanics",
        allmechanicsDetails,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMechanic = async (req: Request, res: Response): Promise<void> => {
  try {
    await userModel.deleteOne({ _id: req.params.mechId });
    res.status(200).json({
      message: 'Mechanic deleted Successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMechanic = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.mechId;
    const updateFields: any = {};

    if (req.body.mechName) {
      updateFields.mechName = req.body.mechName;
    }

    if (req.body.email) {
      updateFields.email = req.body.email;
    }

    if (req.body.number) {
      updateFields.number = req.body.number;
    }

    if (req.body.status) {
      updateFields.status = req.body.status;
    }

    const updatedMechanic = await userModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
    
    res.status(200).json({
      message: 'Mechanic Details Updated Successfully',
      updatedMechanic: updatedMechanic
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};
