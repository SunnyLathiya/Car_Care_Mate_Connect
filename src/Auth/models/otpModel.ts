import mongoose, { Schema, Document } from "mongoose";
import mailSender from "../../utils/mailSender"

// dotenv.config();

interface OTP extends Document {
  email: string;
  otp: string;
}

const OTPSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // OTP document expires after 5 minutes
  },
});

async function sendVerificationMail(email: string, otp: string): Promise<void> {
  try {
    await mailSender(
      email,
      "Verification Mail from CarCareMateConnect",
      `Your OTP is: ${otp}`
    );
    console.log("Verification email sent successfully.");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Propagate the error
  }
}

OTPSchema.pre<OTP>("save", async function (next) {
  try {
    await sendVerificationMail(this.email, this.otp);
    next();
  } catch (error) {
    next(); // Pass the error to the next middleware
  }
});

export default mongoose.model<OTP>("OTP", OTPSchema);
