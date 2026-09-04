import type { Request, Response, NextFunction } from "express";
import { register, login } from "../services/auth.services.js";
import { env } from "../config/env.js";

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const registerController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const result = await register({
            name,
            email,
            password,
        });

        res.cookie(
            "refreshToken",
            result.refreshToken,
            REFRESH_TOKEN_COOKIE_OPTIONS,
        );

        res.status(201).json({
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const result = await login({
            email,
            password,
        });

        res.cookie(
            "refreshToken",
            result.refreshToken,
            REFRESH_TOKEN_COOKIE_OPTIONS,
        );

        res.status(200).json({
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken,
            }
        });
    } catch (error) {
        next(error);
    }
};