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
    .catch((error: Error) => {
      res.status(500).json({
        message: error.message,
      });
    });
};

// export const addService = async (req: Request, res: Response): Promise<void> => {
//   try {
//     // Check if a service with the same name already exists
//     const existingService = await serviceModel.findOne({ name: req.body.name }).exec();

//     if (existingService) {
//       // Service with the same name already exists
//       res.status(409).json({
//         message: "Entered Service Name Already Exists",
//       });
//       return;
//     }

//     // Create a new service document based on request body
//     const newService: Service = {
//       serviceType: req.body.serviceType,
//       name: req.body.name,
//       price: req.body.price,
//       description: req.body.description,
//       timeRequired: req.body.timeRequired,
//       where: req.body.where,
//     };

//     // Save the new service to the database
//     const savedService = await serviceModel.create(newService);

//     console.log("Service Added: ", savedService);
//     res.status(201).json({
//       message: "Service Added Successfully",
//       service: savedService,
//     });
//   } catch (error: any) {
//     console.error("Add Service Error: ", error);
//     res.status(500).json({
//       error: error.message || "Internal Server Error",
//     });
//   }
// };

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

// export const updateService = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const id = req.params.serviceId;
//     console.log(id)
//     // console.log(req.body)
//    const newservice= await serviceModel.findByIdAndUpdate(id , { $set: { name: req.body.name, serviceType: req.body.serviceType, price: req.body.price, description: req.body.description, timeRequired: req.body.timeRequired, where: req.body.where } },{new:true});

//   //  console.log(newservice)

//     res.status(200).json({
//       message: 'Service Updated Successfully',
//       data: newservice
//     });
//   } catch (error: any) {
//     console.log('Update Service Error: ' + error);
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

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

    // Find and update the service document by ID
    const updatedService = await serviceModel.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedService) {
      // If no service was found with the specified ID
      res.status(404).json({
        error: "Service not found",
      });
      return;
    }

    // Service successfully updated
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
        error: "Service not found",
      });
    } else {
      res.status(200).json({
        status: "Service Deleted Successfully",
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
