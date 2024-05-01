import { Request, Response } from "express";
import userModel from "../models/userModel";


export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    const customerDetails = await userModel.findById(userId);
    if (!customerDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // const profileId = customerDetails.additionalDetails;
    const profileDetails = await userModel.findById(userId);

    if (!profileDetails) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: profileDetails,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const updatedProfile = async (req: Request, res: Response) => {
  try {
    const { profilePhoto, username, firstName, lastName, email, phoneNumber, address, zipcode, state, country, yourCar, favouriteCar
       } = req.body;
    const id =  req.user?.id;

    // const customerDetails = await userModel.findById(id);
    const profileDetails = await userModel.findById(id);
    console.log("1")
    // console.log(customerDetails);
    console.log("2")
    // console.log(profileId)
    console.log("3")
    console.log(profileDetails)

    if (!profileDetails) {
      return res.status(400).json({
        success: false,
        message: "Profile not found",
      });
    }

    profileDetails.profilePhoto = profilePhoto || profileDetails.profilePhoto;
    profileDetails.username = username || profileDetails.username;
    profileDetails.firstName = firstName || profileDetails.firstName;
    profileDetails.lastName = lastName || profileDetails.lastName;
    profileDetails.email = email || profileDetails.email;
    profileDetails.phoneNumber = phoneNumber || profileDetails.phoneNumber;
    profileDetails.address = address || profileDetails.address;
    profileDetails.zipcode = zipcode || profileDetails.zipcode;
    profileDetails.state = state || profileDetails.state;
    profileDetails.country = country || profileDetails.country;
    profileDetails.yourCar = yourCar || profileDetails.yourCar;
    profileDetails.favouriteCar = favouriteCar || profileDetails.favouriteCar;

    // const latestProfile =await profileDetails.save();

    const updatedProfile = await profileDetails.save();


    const latestProfile = await userModel.findById(id);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile: latestProfile,
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

    // await profileModel.findOneAndDelete({ _id: userDetails.additionalDetails });
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