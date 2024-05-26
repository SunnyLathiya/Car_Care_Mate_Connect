import { Request, Response } from "express";
import userModel from "../../Auth/models/userModel";

export const findAvailable = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mechanicsList = await userModel
      .find({ accountType: "Mechanic", status: "AVAILABLE" })
      .exec();
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
      message: error.message || "Internal Server Error!",
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const allmechanicsDetails = await userModel
      .find({ accountType: "Mechanic" })
      .select(" id mechName email phoneNumber status orders")
      .exec();

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
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const deleteMechanic = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await userModel.deleteOne({ _id: req.params.mechId });
    res.status(200).json({
      message: "Mechanic deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
