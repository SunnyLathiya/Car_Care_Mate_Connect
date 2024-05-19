// import express, { Request, Response } from 'express';
// import Stripe from 'stripe';

// const router = express.Router();
// const stripe = new Stripe('sk_test_51PHo5FSHLSjFfm6ikkeiKl78yhkg02wxfSZBwC6r7AKROns55LHBgCgG5rrhcpZgulUZc2mBpspkxQHgnMU98YIe00HNnGGuOs', {
//   apiVersion: '2024-04-10', // Updated to the correct API version
// });

// router.post('/create-payment-intent', async (req: Request, res: Response) => {
//   const { amount } = req.body; // Amount should be in cents (e.g., $10.00 -> 1000 cents)

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd', // or your preferred currency
//     });

//     res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error: any) {
//     res.status(500).send({ error: error.message });
//   }
// });

// export default router;
