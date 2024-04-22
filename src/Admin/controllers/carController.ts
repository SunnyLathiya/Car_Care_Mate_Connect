import { Request, Response } from 'express';
import carModel, { Car } from '../models/carModel';

export const addCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const existingCar = await carModel.findOne({ name: req.body.name });
    if (existingCar) {
       res.status(409).json({
        message: 'Name Already Exist',
      });
    }

    const car = new carModel({
      name: req.body.name,
      brand: req.body.brand,
    });

    const savedCar = await car.save();

    console.log('Car Added: ' + savedCar);
    res.status(201).json({
      message: 'Car Added Successfully',
      car: {
        brand: savedCar.brand,
        name: savedCar.name,
        _id: savedCar._id,
      },
    });
  } catch (error: any) {
    console.log('Add Car Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const findAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await carModel.find().select('_id name brand');
    if (cars.length === 0) {
      res.status(200).json({
        message: 'No Cars Available',
      });
    } else {
      res.send(cars);
    }
  } catch (error: any) {
    console.log('Find All Cars Method Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const findAllBrands = async (req: Request, res: Response): Promise<void> => {
  try {
    const brands = await carModel.find().distinct('brand');
    if (brands.length === 0) {
      res.status(200).json({
        message: 'No Brands Available',
      });
    } else {
      res.send(brands);
    }
  } catch (error: any) {
    console.log('Find All Brand Method Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const findByBrand = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars = await carModel.find({ brand: req.body.brand }).select('name');
    if (cars.length < 1) {
       res.status(404).json({
        message: 'This Brand is Not available',
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
    console.log('Find By Brand Error: ' + error);
    res.status(500).json({
      error: error.message,

    });
  }
};

export const findByCarId = async (req: Request, res: Response): Promise<void> => {
  try {
    const car = await carModel.findOne({ _id: req.params.carId });
    if (!car) {
       res.status(404).json({
        message: 'This Car is Not available',
      });
    } else {
       res.status(200).json({
        response: car,
      });
    }
  } catch (error: any) {
    console.log('Find By Car Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    // console.log(id)
    // console.log(req.body)
   const newcar= await carModel.findByIdAndUpdate(id , { $set: { name: req.body.name, brand: req.body.brand } },{new:true});

  //  console.log(newcar)
    console.log('Updated Successfully');
    res.status(200).json({
      message: 'Car Updated Successfully',
      newcar
    });
  } catch (error: any) {
    console.log('Update Car Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    await carModel.deleteOne({ _id: req.params.carId });
    res.status(200).json({
      message: 'Car deleted Successfully',
    });
  } catch (error: any) {
    console.log('Delete Car: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};
