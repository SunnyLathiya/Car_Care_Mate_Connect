import { Request, Response } from "express";
import profileModel from "../models/profileModel";
import userModel from "../../Auth/models/userModel";


export const updatedProfile = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, address, zipcode, state, country, yourCar=[],
      //  favouriteCar=[]
       } = req.body;
    const id =  req.user?.id;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "missing properties- phone number required",
      });
    }

    const customerDetails = await userModel.findById(id);
    const profileId = customerDetails?.additionalDetails;
    const profileDetails = await profileModel.findById(profileId);
    console.log("1")
    console.log(customerDetails);
    console.log("2")
    console.log(profileId)
    console.log("3")
    console.log(profileDetails)

    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }

    profileDetails.phoneNumber = phoneNumber;
    profileDetails.address = address;
    profileDetails.zipcode = zipcode;
    profileDetails.state = state;
    profileDetails.country = country;
    profileDetails.yourCar = yourCar;
    // profileDetails.favouriteCar = favouriteCar;

    await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails,
    });
  } catch (error: any) {

    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Problem in profile updating",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;
    const userDetails = await userModel.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    await profileModel.findOneAndDelete({ _id: userDetails.additionalDetails });
    await userModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted successfully",
      error: error.message,
    });
  }
};

