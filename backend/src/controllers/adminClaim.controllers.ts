import type { Request, Response, NextFunction } from "express";

import { completePrizeClaim, processPrizeClaim } from "../services/adminClaim.services.js";
import type { ClaimIdParam } from "../validators/adminClaim.validators.js";

export const processPrizeClaimController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { claimId } = res.locals.validatedParams as ClaimIdParam;

        const result = await processPrizeClaim(claimId, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const completePrizeClaimController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { claimId } = res.locals.validatedParams as ClaimIdParam;

        const result = await completePrizeClaim(claimId, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};