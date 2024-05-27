import { Request, Response } from "express";
import carModel from "../models/carModel";

export const addCar = async (req: Request, res: Response) => {
  try {
    const existingCar = await carModel.findOne({
      name: req.body.name,
      brand: req.body.brand,
    });
    if (existingCar) {
      return res.status(409).json({
        message: "Name Already Exist!",
      });
    }

    const car = new carModel({
      name: req.body.name,
      brand: req.body.brand,
    });

    const savedCar = await car.save();

    res.status(201).json({
      message: "Car Added Successfully!",
      car: {
        brand: savedCar.brand,
        name: savedCar.name,
        _id: savedCar._id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newcar = await carModel.findByIdAndUpdate(
      id,
      { $set: { name: req.body.name, brand: req.body.brand } },
      { new: true }
    );

    return res.status(200).json({
      message: "Car Updated Successfully",
      newcar,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  try {
    await carModel.deleteOne({ _id: req.params.carId });
    return res.status(200).json({
      message: "Car deleted Successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const findAllCars = async (req: Request, res: Response) => {
  try {
    const cars = await carModel.find().select("_id name brand");
    if (cars.length === 0) {
      return res.status(200).json({
        message: "No Cars Available",
      });
    } else {
      res.send(cars);
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};
