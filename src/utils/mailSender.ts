import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";
import path from "path";

const envPath = path.join(__dirname, "../..", "config.env");
dotenv.config({ path: envPath });

const mailSender = async (
  email: string,
  title: string,
  body: string
): Promise<any> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    } as any);

    const info = await transporter.sendMail({
      from: '"CarCareMateConnect." <no-reply@carcaremate.com>',
      to: `${email}`,
      subject: `${title}`,
      text: `${body}`,
    });

    return info;
  } catch (error: any) {
    message: error.message;
  }
};

export default mailSender;
