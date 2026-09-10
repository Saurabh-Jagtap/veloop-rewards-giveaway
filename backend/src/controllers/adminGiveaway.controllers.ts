import type { Request, Response, NextFunction } from "express";

import { attachPrizeToGiveaway, createGiveaway, deleteGiveaway, endGiveaway, getGiveawayClaims, getGiveawayParticipants, getGiveawayWinners, selectGiveawayWinners, startGiveaway, updateGiveaway, updateGiveawayPrize } from "../services/adminGiveaway.services.js";
import type { AttachPrizeToGiveawayInput, CreateGiveawayInput, GetGiveawayParticipantsInput, GiveawayPrizeIdParams, UpdateGiveawayInput, UpdateGiveawayPrizeInput } from "../validators/adminGiveaway.validators.js";
import { setAuditContext } from "../utils/auditContext.js";


export const createGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        setAuditContext(req, {
            action: "CREATE_GIVEAWAY",
        });
        const input = req.body as CreateGiveawayInput;

        const result = await createGiveaway(input, req.user.id);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "UPDATE_GIVEAWAY",
            giveawayId,
        });

        const input = req.body as UpdateGiveawayInput;

        const result = await updateGiveaway(giveawayId, input, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "DELETE_GIVEAWAY",
            giveawayId,
        });

        const result = await deleteGiveaway(giveawayId, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const startGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "START_GIVEAWAY",
            giveawayId,
        });

        const result = await startGiveaway(giveawayId, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const endGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "END_GIVEAWAY",
            giveawayId,
        });

        const result = await endGiveaway(giveawayId, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const attachPrizeToGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "ATTACH_PRIZE",
            giveawayId,
        });

        const input = req.body as AttachPrizeToGiveawayInput;

        const result = await attachPrizeToGiveaway(giveawayId, input, req.user.id);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const updateGiveawayPrizeController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId, giveawayPrizeId } = res.locals.validatedParams as GiveawayPrizeIdParams;

        setAuditContext(req, {
            action: "UPDATE_GIVEAWAY_PRIZE",
            giveawayId,
        });

        const input = req.body as UpdateGiveawayPrizeInput;

        const result = await updateGiveawayPrize(giveawayId, giveawayPrizeId, input, req.user.id);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getGiveawayParticipantsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const query = res.locals.validatedQuery as GetGiveawayParticipantsInput;

        const result = await getGiveawayParticipants(giveawayId, query);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const selectGiveawayWinnersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        setAuditContext(req, {
            action: "WINNERS_SELECTED",
            giveawayId,
        });

        const result = await selectGiveawayWinners(giveawayId, req.user.id);

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
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const result = await getGiveawayWinners(giveawayId);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const getGiveawayClaimsController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { giveawayId } = res.locals.validatedParams as {
            giveawayId: string;
        };

        const result = await getGiveawayClaims(giveawayId);

        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

