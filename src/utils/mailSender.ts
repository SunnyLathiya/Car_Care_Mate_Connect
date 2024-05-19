import nodemailer, { Transporter } from "nodemailer";


// interface MailSenderOptions {
//   host: string;
//   user: string;
//   pass: string;
// }

const mailSender = async (email: string, title: string, body: string): Promise<any> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: "sunnylathiya702@gmail.com",
        pass: "kcehfmljjzjhvndw",
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
