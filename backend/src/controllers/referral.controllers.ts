import type { Request, Response, NextFunction } from "express";
import { createReferral, getMyReferrals } from "../services/referral.services.js";
import type { GetMyReferralsInput } from "../validators/referral.validators.js";

export const createReferralController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const referral = await createReferral({
            referralCode: req.body.referralCode,
            referredUserId: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: {
                referral,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getMyReferralsController = async (req: Request,res: Response,next: NextFunction): Promise<void> => {
    try {
        const { page, limit } = res.locals.validatedQuery as unknown as GetMyReferralsInput;

        const result = await getMyReferrals({
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