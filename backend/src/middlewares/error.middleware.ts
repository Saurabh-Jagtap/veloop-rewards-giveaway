import type { ErrorRequestHandler } from "express";

import { ApiError } from "../utils/ApiError.js";
import { createAuditLog } from "../utils/auditlog.js";

export const errorMiddleware: ErrorRequestHandler = async (err, req, res, _next) => {
    console.error(err);

    const auditContext = req.auditContext;

    if (auditContext) {
        await createAuditLog({
            requestId: req.requestId,
            action: auditContext.action,
            result: err instanceof ApiError ? "REJECTED" : "FAILED",
            ...(req.user?.id !== undefined && {
                userId: req.user.id,
            }),
            ...(auditContext.giveawayId !== undefined && {
                giveawayId: auditContext.giveawayId,
            }),
            ...(auditContext.referralId !== undefined && {
                referralId: auditContext.referralId,
            }),
            securityInfo: {
                errorCode:
                    err instanceof ApiError
                        ? err.code
                        : "INTERNAL_SERVER_ERROR",
                message:
                    err instanceof Error
                        ? err.message
                        : "Unknown error",
            },
        });
    }

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
};