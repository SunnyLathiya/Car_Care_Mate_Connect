import mongoose, {Schema, Document} from "mongoose";
import mailSender from "../../utils/mailSender";

interface Profile extends Document {
    profilePhoto: string;
    username: string;
    email: string;
    phoneNumber: string;
    address: string;
    zipcode: string;
    state: string;
    country: string;
    yourCar: string;
    favouriteCar: string;

    currentPassword?: string | null,
    newPassword?: string | null,
    confirmPassword?: string | null,

}

const profileSchema: Schema = new Schema ({
    profilePhoto: {
        type: String,
        // required: true
    },
    username: {
        type: String,
        trim: true,
        // required: true,
        minLength: 1,
        maxLength: 70
    },
    email: {
        type: String,
        // unique: true,
        // required: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },
    phoneNumber: {
        type: String,
        // required: true,
        trim: true,
        match: /^\d{10}$/
    },
    address: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 255,
    },
    zipcode: {
        type: String,
        // required: true,
        trim: true,
        match: /^\d{6}$/
    },
    state: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    country: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    yourCars: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    favouriteCar: {
        type: String,
        // required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },


    currentPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30, 
    },
    newPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30,
    },
    confirmPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30,
    },

})

async function sendVerificationMail(email: string, profilePhoto: string): Promise<void> {
    try {
      const mailResponse = await mailSender(
        email,
        "profile update successfully",
        `Your profile photo: ${profilePhoto}`
      );
  
      console.log(mailResponse);
    } catch (error) {
      console.log("error while sending mail");
    }
  }
  
  profileSchema.pre<Profile>("save", async function (next) {
    await sendVerificationMail(this.email, this.profilePhoto);
    next();
  });

export default mongoose.model<Profile>("Profile", profileSchema);