import type { Request, Response, NextFunction } from "express";
import type { CreateAdWatchInput, GetMyAdWatchesInput } from "../validators/adWatch.validators.js";
import { createAdWatch, getMyAdWatches } from "../services/adWatch.services.js";

export const createAdWatchController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { eventId } = req.body as CreateAdWatchInput;

        const adWatch = await createAdWatch({
            eventId,
            userId: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: {
                adWatch,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMyAdWatchesController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page, limit } = res.locals.validatedQuery as GetMyAdWatchesInput;

        const result = await getMyAdWatches({
            userId: req.user.id,
            page,
            limit,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};