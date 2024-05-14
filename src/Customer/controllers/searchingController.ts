import { Request, Response } from 'express';
import carModel from '../../Admin/models/carModel';

export const searchingBrand = async (req: Request, res: Response) => {
    try {
        const query = req.query.query as string | undefined;

        if (!query) {
            return res.status(400).json({ message: 'Query parameter is missing or invalid' });
        }

        // Search for brands that match the query
        const brands = await carModel.find({ name: { $regex: new RegExp(query, 'i') } });

        res.status(200).json(brands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
