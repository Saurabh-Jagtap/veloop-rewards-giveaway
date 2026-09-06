import { GiveawayParticipationModel } from "../models/giveawayParticipation.model.js";

type GetMyParticipationsInput = {
    userId: string;
    page: number;
    limit: number;
};

export const getMyParticipations = async ({ userId, page, limit }: GetMyParticipationsInput) => {
    const skip = (page - 1) * limit;

    const [participations, total] = await Promise.all([
        GiveawayParticipationModel.find({ userId })
            .sort({ joinedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        GiveawayParticipationModel.countDocuments({ userId }),
    ]);

    return {
        participations: participations.map((participation) => ({
            id: participation._id.toString(),
            giveawayId: participation.giveawayId.toString(),
            prizeId: participation.prizeId.toString(),
            entryCurrency: participation.entryCurrency,
            entryAmount: participation.entryAmount,
            status: participation.status,
            joinedAt: participation.joinedAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};