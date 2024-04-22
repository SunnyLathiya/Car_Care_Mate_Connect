import nodemailer, { Transporter } from "nodemailer";


// interface MailSenderOptions {
//   host: string;
//   user: string;
//   pass: string;
// }

const mailSender = async (email: string, title: string, body: string): Promise<any> => {
  try {
    console.log(process.env.MAIL_USER,process.env.MAIL_PASS)
    const transporter: Transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: "sunnylathiya702@gmail.com",
        pass: "kcehfmljjzjhvndw",
      },
    } as any);

    const info = await transporter.sendMail({
      from: "CarCareMateConnect.",
      to: `${email}`,
      subject: `${title}`,
      text: `${body}`,
    });
    // console.log(info);
    return info;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default mailSender;
