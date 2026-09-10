import { randomUUID } from "node:crypto";

import { AuditLogModel } from "../models/auditLog.model.js";

type CreateAuditLogInput = {
    userId?: string;
    giveawayId?: string;
    referralId?: string;
    requestId?: string;
    action: string;
    amount?: number;
    currency?: string;
    result: "SUCCESS" | "REJECTED" | "FAILED";
    securityInfo?: Record<string, unknown>;
};

export const createAuditLog = async ({
    userId,
    giveawayId,
    referralId,
    requestId,
    action,
    amount,
    currency,
    result,
    securityInfo,
}: CreateAuditLogInput): Promise<void> => {
    try {
        const auditData = {
            requestId: requestId ?? randomUUID(),
            action,
            result,
            ...(userId !== undefined && { userId }),
            ...(giveawayId !== undefined && { giveawayId }),
            ...(referralId !== undefined && { referralId }),
            ...(amount !== undefined && { amount }),
            ...(currency !== undefined && { currency }),
            ...(securityInfo !== undefined && { securityInfo }),
        };

        await AuditLogModel.create(auditData);
    } catch (error) {
        console.error("Failed to create audit log:", error);
    }
};