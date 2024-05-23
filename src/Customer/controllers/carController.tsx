import { Request, Response } from "express";
import carModel, { Car } from "../../Admin/models/carModel";

export const findAllBrands = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const brands = await carModel.find().distinct("brand");
    if (brands.length === 0) {
      res.status(200).json({
        message: "No Brands Available",
      });
    } else {
      res.send(brands);
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const findByBrand = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cars = await carModel.find({ brand: req.body.brand }).select("name");
    if (cars.length < 1) {
      res.status(404).json({
        message: "This Brand is Not available",
      });
    } else {
      res.status(200).json({
        message: "all car of this brand related",
        cars: cars.map((car: Car) => ({
          name: car.name,
          _id: car._id,
        })),
      });
    }
  } catch (error: any) {
    console.log("Find By Brand Error: " + error);
    res.status(500).json({
      message: error.message,
    });
  }
};


export const findByCarId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const car = await carModel.findOne({ _id: req.params.carId });
    if (!car) {
      res.status(404).json({
        message: "This Car is Not available",
      });
    } else {
      res.status(200).json({
        response: car,
      });
    }
  } catch (error: any) {
    console.log("Find By Car Error: " + error);
    res.status(500).json({
      message: error.message,
    });
  }
};
