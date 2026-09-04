import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

type TokenPayload = {
    sub: string;
};

export const generateAccessToken = (userId: string): string => {
    return jwt.sign(
        {
            sub: userId,
        },
        env.JWT_SECRET,
        {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        },
    );
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign(
        {
            sub: userId,
        },
        env.REFRESH_SECRET,
        {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN,
        },
    );
};

export const verifyAccessToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, env.REFRESH_SECRET) as TokenPayload;
};