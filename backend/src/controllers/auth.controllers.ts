import type { Request, Response, NextFunction } from "express";
import {
    register,
    login,
} from "../services/auth.services.js";
import { env } from "../config/env.js";
import {
    generateAccessToken,
    verifyRefreshToken,
} from "../utils/token.js";
import { ApiError } from "../utils/ApiError.js";
import { UserModel } from "../models/user.model.js";

const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
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

export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
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
            },
        });
    } catch (error) {
        next(error);
    }
};

export const refreshTokenController = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (!refreshToken) {
            throw new ApiError(
                401,
                "REFRESH_TOKEN_MISSING",
                "Refresh token is required",
            );
        }

        let payload;

        try {
            payload = verifyRefreshToken(refreshToken);
        } catch {
            throw new ApiError(
                401,
                "INVALID_REFRESH_TOKEN",
                "Invalid or expired refresh token",
            );
        }

        if (!payload.sub) {
            throw new ApiError(
                401,
                "INVALID_REFRESH_TOKEN",
                "Invalid refresh token",
            );
        }

        const user = await UserModel.findById(payload.sub);

        if (!user) {
            throw new ApiError(
                401,
                "USER_NOT_FOUND",
                "User associated with this refresh token was not found",
            );
        }

        if (user.status !== "ACTIVE") {
            throw new ApiError(
                403,
                "ACCOUNT_NOT_ACTIVE",
                "Your account is not allowed to authenticate",
            );
        }

        const accessToken = generateAccessToken(user._id.toString());

        res.status(200).json({
            success: true,
            data: {
                accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const logoutController = async (
    _req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({
            success: true,
            data: {
                message: "Logged out successfully",
            },
        });
    } catch (error) {
        next(error);
    }
};