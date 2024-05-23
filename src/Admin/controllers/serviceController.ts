import { Request, Response } from 'express';
import serviceModel, {Service} from '../models/serviceModel';

 
export const addService = (req: Request, res: Response): void => {
  try {
    serviceModel.findOne({ name: req.body.name })
      .exec()
      .then((response: Service | null) => {
        if (response) {
          return res.status(409).json({
            message: "Entered Service Name is Already Exist",
          });
        } else {
          const service = new serviceModel({
            serviceType: req.body.serviceType,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            timeRequired: req.body.timeRequired,
            where: req.body.where,
          });
          service.save().then((response: Service) => {
            console.log("Service Added: " + response);
            res.status(201).json({
              message: "Service Added Successfully",
              service
            });
          });
        }
      })
      .catch((error: Error) => {
        throw error; 
      });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error!",
    });
  }
};

export const findAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const services = await serviceModel.find().select("-__v").exec();

    if (services.length === 0) {
      res.status(200).json({
        message: "No Services Available at this Time",
      });
    } else {
      res.status(200).json({
        services: services,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};


export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.serviceId;
    const updateFields: Partial<Service> = {
      name: req.body.name,
      serviceType: req.body.serviceType,
      price: req.body.price,
      description: req.body.description,
      timeRequired: req.body.timeRequired,
      where: req.body.where,
    };

    const updatedService = await serviceModel.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedService) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }

    res.status(200).json({
      message: "Service Updated Successfully",
      data: updatedService,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.serviceId;
    const result = await serviceModel.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 0) {
      res.status(404).json({
        message: "Service not found",
      });
    } else {
      res.status(200).json({
        message: "Service Deleted Successfully",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

export const findByServiceId = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await serviceModel.findOne({ _id: req.params.serviceId }).exec();

    if (response === null) {
      res.status(404).json({
        message: "This Service is Not available",
      });
    } else {
      res.status(200).json({
        response,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};