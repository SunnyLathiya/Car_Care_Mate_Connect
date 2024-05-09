import { Request, Response } from 'express';
import mailSender from '../../utils/mailSender';

const sendEmailController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, useremailid, message } = req.body;

    if (!username || !useremailid || !message) {
      res.status(400).json({ error: 'Require all fields!' });
      return;
    }

    const title = `Message from ${username}`;
    const body = `Message: ${message}\n\nSent from: ${useremailid}`;

    const result = await mailSender(useremailid, title, body);

    res.status(200).json({ message: 'Email sent successfully!', result });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
};

export default sendEmailController;
