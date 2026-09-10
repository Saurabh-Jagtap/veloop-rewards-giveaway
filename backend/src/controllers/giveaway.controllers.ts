import type { Request, Response, NextFunction } from "express";
import { getCurrentGiveaway, getGiveawayById, getGiveawayWinners, getMyGiveawayClaim, getMyGiveawayStatus, getPreviousGiveaways, getPreviousWinners, joinGiveaway, submitGiveawayClaim } from "../services/giveaway.services.js";
import type { GetPreviousGiveawaysInput, GetPreviousWinnersInput, GiveawayIdParam } from "../validators/giveaway.validators.js";
import crypto from "node:crypto";

export const getCurrentGiveawayController = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await getCurrentGiveaway();

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getGiveawayByIdController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams;

        const result = await getGiveawayById(giveawayId);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getPreviousGiveawaysController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page, limit } = res.locals.validatedQuery as GetPreviousGiveawaysInput;

        const result = await getPreviousGiveaways({
            page,
            limit,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyGiveawayStatusController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as GiveawayIdParam;

        const result = await getMyGiveawayStatus({
            giveawayId,
            userId: req.user.id,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getGiveawayWinnersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as GiveawayIdParam;

        const result = await getGiveawayWinners(giveawayId);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getPreviousWinnersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { page, limit } = res.locals.validatedQuery as GetPreviousWinnersInput;

        const result = await getPreviousWinners({
            page,
            limit,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const joinGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as GiveawayIdParam;

        const userId = req.user.id;

        const userAgent = req.get("user-agent") ?? "unknown";
        const ip = req.ip ?? "unknown";

        const deviceHash = crypto.createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");

        const result = await joinGiveaway({
            giveawayId,
            userId,
            deviceHash,
        });

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const submitGiveawayClaimController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const result = await submitGiveawayClaim({
            giveawayId,
            userId: req.user.id,
            claimData: req.body,
        });

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getMyGiveawayClaimController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as GiveawayIdParam;

        const result = await getMyGiveawayClaim({
            giveawayId,
            userId: req.user.id,
        });

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};