import type { Request, Response, NextFunction } from "express";

import { createGiveaway, deleteGiveaway, updateGiveaway } from "../services/adminGiveaway.services.js";
import type { CreateGiveawayInput, UpdateGiveawayInput } from "../validators/adminGiveaway.validators.js";

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

export const updateGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const input = req.body as UpdateGiveawayInput;

        const result = await updateGiveaway(giveawayId, input);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const result = await deleteGiveaway(giveawayId);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};