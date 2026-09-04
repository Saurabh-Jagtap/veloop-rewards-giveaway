import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError.js";

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            code: err.code,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
    });
}