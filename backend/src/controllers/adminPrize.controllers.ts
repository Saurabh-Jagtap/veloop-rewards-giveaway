import type { Request, Response, NextFunction } from "express";

import { createPrize } from "../services/adminPrize.services.js";
import type { CreatePrizeInput } from "../validators/adminPrize.validators.js";
import { setAuditContext } from "../utils/auditContext.js";

export const createPrizeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const input = req.body as CreatePrizeInput;

        setAuditContext(req, {
            action: "CREATE_PRIZE",
        });

        const result = await createPrize(input, req.user.id);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};