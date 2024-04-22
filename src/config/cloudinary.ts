import { v2 as cloudinary } from "cloudinary";
// import dotenv from "dotenv";

// dotenv.config();

export const cloudinaryConnect = () => {
  try {
    cloudinary.config({
    //   cloud_name: process.env.CLOUD_NAME!,
    //   api_key: process.env.API_KEY!,
    //   api_secret: process.env.API_SECRET!,
    cloud_name: "dm67eqbrd",
    api_key: "852914557736983",
    api_secret: "SDJZFt51hK3K9TvaOPYR03iOGCo",
    });
  } catch (error) {
    console.log(error);
  }
};
