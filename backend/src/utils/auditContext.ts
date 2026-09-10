import type { Request } from "express";

type AuditContext = {
    action: string;
    giveawayId?: string;
    referralId?: string;
};

export const setAuditContext = (req: Request, context: AuditContext): void => {
    req.auditContext = context;
};