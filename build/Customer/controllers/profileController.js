"use strict";
// import { Request, Response } from "express";
// import profileModel from "../models/profileModel";
// import customerModel from "../models/customerModel";
// export const updatedProfile = async (req: Request, res: Response) => {
//   try {
//     const { phoneNumber, address, zipcode, state, country, yourCar=[], favouriteCar=[] } = req.body;
//     const id = req.user.id;
//     if (!phoneNumber) {
//       return res.status(400).json({
//         success: false,
//         message: "missing properties- phone number required",
//       });
//     }
//     const userDetails = await customerModel.findById(id);
//     const profileId = userDetails?.additionalDetails;
//     const profileDetails = await profileModel.findById(profileId);
//     if (!profileDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "Profile not found",
//       });
//     }
//     profileDetails.phoneNumber = phoneNumber;
//     profileDetails.address = address;
//     profileDetails.zipcode = zipcode;
//     profileDetails.state = state;
//     profileDetails.country = country;
//     profileDetails.yourCar = yourCar;
//     profileDetails.favouriteCar = favouriteCar;
//     await profileDetails.save();
//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       profileDetails,
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: "Problem in profile updating",
//       error: error.message,
//     });
//   }
// };
// export const deleteAccount = async (req: Request, res: Response) => {
//   try {
//     const id = req.user.id;
//     const userDetails = await customerModel.findById(id);
//     if (!userDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     await profileModel.findOneAndDelete({ _id: userDetails.additionalDetails });
//     await customerModel.findByIdAndDelete(id);
//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       success: false,
//       message: "User cannot be deleted successfully",
//       error: error.message,
//     });
//   }
// };
// import { v2 as cloudinary, UploadApiResponse, UploadApiOptions } from 'cloudinary';
// function isFileSupported(type: string, supportedTypes: string[]): boolean {
//     return supportedTypes.includes(type);
// }
// interface UploadedFile extends Express.Multer.File {
//     tempFilePath: string;
// }
// async function uploadFileToCloudinary(file: UploadedFile, folder: string, quality?: number): Promise<UploadApiResponse> {
//     const options: UploadApiOptions = { folder };
//     // options.resource_type = "auto";
//     if (quality) {
//         options.quality = quality
//     }
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }
// cloudinary.config({
//     cloud_name: "dm67eqbrd",
//     api_key: "852914557736983",
//     api_secret: "SDJZFt51hK3K9TvaOPYR03iOGCo"
// });
// export const updateDisplayPicture = async (req: Request, res: Response) => {
//     try {
//         const displayPicture = req.files.profilePhoto;
//         const userId = req.user.id;
//         if (!displayPicture) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Display picture not found in request"
//             });
//         }
//         const supportedTypes = ["jpg", "jpeg", "png"];
//         const fileType = displayPicture.name.split('.')[1].toLowerCase();
//         if (!isFileSupported(fileType, supportedTypes)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File format not supported"
//             });
//         }
//         const response = await uploadFileToCloudinary(displayPicture, "codehelp", 30);
//         const updatedProfile = await customerModel.findByIdAndUpdate(
//             { _id: userId },
//             { profilePhoto: response.secure_url },
//             { new: true }
//         );
//         res.status(200).json({
//             success: true,
//             message: "Image updated successfully",
//             data: updatedProfile,
//         });
//     } catch (error: any) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Problem updating image",
//         });
//     }
// };
