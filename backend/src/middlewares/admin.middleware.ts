import type { Request, Response, NextFunction } from "express";

import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const adminMiddleware = async (req: Request, _res: Response,next: NextFunction): Promise<void> => {
    try {
        const user = await UserModel.findById(req.user.id)
            .select("role status")
            .lean();

        if (!user) {
            throw new ApiError(404, "USER_NOT_FOUND", "User not found");
        }

        if (user.status !== "ACTIVE") {
            throw new ApiError(403,"ACCOUNT_NOT_ACTIVE","Account is not active");
        }

        if (user.role !== "ADMIN") {
            throw new ApiError(403,"ADMIN_ACCESS_REQUIRED","Admin access required");
        }

        next();
    } catch (error) {
        next(error);
    }
};