import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";

export type AuthenticatedRequest = Request & {
    user: {
        id: string;
    };
};

export const authMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next(
            new ApiError(
                401,
                "LOGIN_REQUIRED",
                "Authentication required",
            ),
        );
    }

    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
        return next(
            new ApiError(
                401,
                "INVALID_ACCESS_TOKEN",
                "Invalid authentication token",
            ),
        );
    }

    try {
        const payload = verifyAccessToken(token);

        if (!payload.sub) {
            return next(
                new ApiError(
                    401,
                    "INVALID_ACCESS_TOKEN",
                    "Invalid authentication token",
                ),
            );
        }

        req.user = {
            id: payload.sub,
        };

        next();
    } catch {
        return next(
            new ApiError(
                401,
                "INVALID_ACCESS_TOKEN",
                "Invalid authentication token",
            ),
        );
    }
};