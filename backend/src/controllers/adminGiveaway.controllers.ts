import type { Request, Response, NextFunction } from "express";

import { attachPrizeToGiveaway, createGiveaway, deleteGiveaway, endGiveaway, getGiveawayClaims, getGiveawayParticipants, getGiveawayWinners, selectGiveawayWinners, startGiveaway, updateGiveaway, updateGiveawayPrize } from "../services/adminGiveaway.services.js";
import type { AttachPrizeToGiveawayInput, CreateGiveawayInput, GetGiveawayParticipantsInput, GiveawayPrizeIdParams, UpdateGiveawayInput, UpdateGiveawayPrizeInput } from "../validators/adminGiveaway.validators.js";


export const createGiveawayController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const input = req.body as CreateGiveawayInput;

        const result = await createGiveaway(input);

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

        const input = req.body as UpdateGiveawayInput;

        const result = await updateGiveaway(giveawayId, input);

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

        const result = await deleteGiveaway(giveawayId);

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

        const result = await startGiveaway(giveawayId);

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

        const result = await endGiveaway(giveawayId);

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

        const input = req.body as AttachPrizeToGiveawayInput;

        const result = await attachPrizeToGiveaway(giveawayId, input);

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

        const input = req.body as UpdateGiveawayPrizeInput;

        const result = await updateGiveawayPrize(
            giveawayId,
            giveawayPrizeId,
            input,
        );

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

        const result = await selectGiveawayWinners(giveawayId);

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

