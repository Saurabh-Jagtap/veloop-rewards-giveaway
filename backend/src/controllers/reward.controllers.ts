import type { Request, Response, NextFunction } from "express";
import { getMyRewards } from "../services/reward.services.js";
import type { GetMyRewardsInput } from "../validators/reward.validators.js";

export const getMyRewardsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page, limit } = res.locals.validatedQuery as GetMyRewardsInput;

        const result = await getMyRewards({
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