import type { Request, Response, NextFunction } from "express";
import { getReferralMilestones } from "../services/referralMilestone.services.js";

export const getReferralMilestonesController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await getReferralMilestones();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};