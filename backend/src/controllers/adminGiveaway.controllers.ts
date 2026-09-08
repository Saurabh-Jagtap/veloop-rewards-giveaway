import type { Request, Response, NextFunction } from "express";

import { createGiveaway } from "../services/adminGiveaway.services.js";
import type { CreateGiveawayInput } from "../validators/adminGiveaway.validators.js";

export const createGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const input = req.body as CreateGiveawayInput;

        const result = await createGiveaway(input);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};