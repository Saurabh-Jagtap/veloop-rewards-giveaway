import { PrizeModel } from "../models/prize.model.js";
import type { CreatePrizeInput } from "../validators/adminPrize.validators.js";

export const createPrize = async (input: CreatePrizeInput) => {
    const prize = await PrizeModel.create({
        name: input.name,
        position: input.position,
        image: input.image,
        description: input.description,
        winnerCount: input.winnerCount,
        type: input.type,
        claimType: input.claimType,
    });

    return {
        prize: {
            id: prize._id.toString(),
            name: prize.name,
            position: prize.position,
            image: prize.image,
            description: prize.description,
            winnerCount: prize.winnerCount,
            type: prize.type,
            claimType: prize.claimType,
            createdAt: prize.createdAt,
            updatedAt: prize.updatedAt,
        },
    };
};