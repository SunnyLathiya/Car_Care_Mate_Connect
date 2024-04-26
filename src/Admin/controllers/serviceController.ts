import { Request, Response } from 'express';
import serviceModel, {Service} from '../models/serviceModel';

 
export const addService = (req: Request, res: Response): void => {
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
    .catch((err: Error) => {
      console.log("Add Service Error: " + err);
      res.status(500).json({
        error: err.message,
      });
    });
};

export const findAll = (req: Request, res: Response): void => {
  serviceModel.find()
    .select("-__v")
    .exec()
    .then((response: Service[]) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Services Available at this Time",
        });
      } else {
        res.status(200).json({
          service: response,
        });
      }
    })
    .catch((err: Error) => {
      console.log("Find All Method Error: " + err);
      res.status(500).json({
        error: err.message,
      });
    });
};

export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.serviceId;
    console.log(id)
    // console.log(req.body)
   const newservice= await serviceModel.findByIdAndUpdate(id , { $set: { name: req.body.name, serviceType: req.body.serviceType, price: req.body.price, description: req.body.description, timeRequired: req.body.timeRequired, where: req.body.where } },{new:true});

  //  console.log(newservice)

    res.status(200).json({
      message: 'Service Updated Successfully',
      data: newservice
    });
  } catch (error: any) {
    console.log('Update Service Error: ' + error);
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteService = (req: Request, res: Response): void => {
  const id = req.params.serviceId;
  serviceModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: "Service Deleted Successfully",
      });
    })
    .catch((err: Error) => {
      console.log("Service Delete Error: " + err);
      res.status(500).json({
        error: err.message,
      });
    });
};

export const findByServiceId = (req: Request, res: Response): void => {
  serviceModel.findOne({ _id: req.params.serviceId })
    .exec()
    .then((response: Service | null) => {
      if (response === null) {
        return res.status(404).json({
          message: "This Service is Not available",
        });
      } else {
        return res.status(200).json({
          response,
        });
      }
    })
    .catch((err: Error) => {
      console.log("Find By Service Error: " + err);
      res.status(500).json({
        error: err.message,
      });
    });
};
