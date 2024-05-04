import { Request, Response } from 'express';
import mailSender from '../../utils/mailSender';

// Define your controller function
const sendEmailController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, useremailid, message } = req.body;

    // Ensure required fields are provided
    if (!username || !useremailid || !message) {
      res.status(400).json({ error: 'Please provide username, useremailid, and message' });
      return;
    }

    // Prepare the email content
    const title = `Message from ${username}`;
    const body = `Message: ${message}\n\nSent from: ${useremailid}`;

    // Send the email using mailSender function
    const result = await mailSender(useremailid, title, body);

    // Respond with success message
    res.status(200).json({ message: 'Email sent successfully!', result });
  } catch (error) {
    // Handle any errors
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export default sendEmailController;
