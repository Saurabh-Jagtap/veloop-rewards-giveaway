import { GiveawayModel } from "../models/giveaway.model.js";
import { GiveawayParticipationModel } from "../models/giveawayParticipation.model.js";
import { GiveawayPrizeModel } from "../models/giveawayPrize.model.js";
import { PrizeModel } from "../models/prize.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { GetPreviousGiveawaysInput } from "../validators/giveaway.validators.js";

export const getCurrentGiveaway = async () => {
    const now = new Date();

    const giveaway = await GiveawayModel.findOne({
        status: "ACTIVE",
        startAt: {
            $lte: now,
        },
        endAt: {
            $gt: now,
        },
    }).lean();

    if (!giveaway) {
        return {
            giveaway: null,
        };
    }

    const giveawayPrizes = await GiveawayPrizeModel.find({
        giveawayId: giveaway._id,
    })
        .sort({ position: 1 })
        .lean();

    const prizeIds = giveawayPrizes.map((giveawayPrize) => giveawayPrize.prizeId);

    const prizes = await PrizeModel.find({
        _id: {
            $in: prizeIds,
        },
    }).lean();

    const prizeMap = new Map(
        prizes.map((prize) => [
            prize._id.toString(),
            prize,
        ]),
    );

    return {
        giveaway: {
            id: giveaway._id.toString(),
            title: giveaway.title,
            slug: giveaway.slug,
            description: giveaway.description,
            status: giveaway.status,
            rules: giveaway.rules,
            eligibility: giveaway.eligibility,
            participationSettings: giveaway.participationSettings,
            startAt: giveaway.startAt,
            endAt: giveaway.endAt,

            prizes: giveawayPrizes.map((giveawayPrize) => {
                const prize = prizeMap.get(
                    giveawayPrize.prizeId.toString(),
                );

                return {
                    giveawayPrizeId: giveawayPrize._id.toString(),
                    prizeId: giveawayPrize.prizeId.toString(),
                    name: prize?.name,
                    image: prize?.image,
                    description: prize?.description,
                    type: prize?.type,
                    claimType: prize?.claimType,
                    entryCurrency: giveawayPrize.entryCurrency,
                    entryAmount: giveawayPrize.entryAmount,
                    position: giveawayPrize.position,
                    winnerCount: giveawayPrize.winnerCount,
                };
            }),
        },
    };
};

export const getGiveawayById = async (giveawayId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId).lean();

    if (!giveaway) {
        throw new ApiError(404,"GIVEAWAY_NOT_FOUND","Giveaway not found");
    }

    const giveawayPrizes = await GiveawayPrizeModel.find({giveawayId: giveaway._id})
        .sort({ position: 1 })
        .lean();

    const prizeIds = giveawayPrizes.map((giveawayPrize) => giveawayPrize.prizeId);

    const prizes = await PrizeModel.find({
        _id: {
            $in: prizeIds,
        },
    }).lean();

    const prizeMap = new Map(
        prizes.map((prize) => [
            prize._id.toString(),
            prize,
        ]),
    );

    return {
        giveaway: {
            id: giveaway._id.toString(),
            title: giveaway.title,
            slug: giveaway.slug,
            description: giveaway.description,
            status: giveaway.status,
            rules: giveaway.rules,
            eligibility: giveaway.eligibility,
            participationSettings: giveaway.participationSettings,
            startAt: giveaway.startAt,
            endAt: giveaway.endAt,

            prizes: giveawayPrizes.map((giveawayPrize) => {
                const prize = prizeMap.get(
                    giveawayPrize.prizeId.toString(),
                );

                return {
                    giveawayPrizeId: giveawayPrize._id.toString(),
                    prizeId: giveawayPrize.prizeId.toString(),
                    name: prize?.name,
                    image: prize?.image,
                    description: prize?.description,
                    type: prize?.type,
                    claimType: prize?.claimType,
                    entryCurrency: giveawayPrize.entryCurrency,
                    entryAmount: giveawayPrize.entryAmount,
                    position: giveawayPrize.position,
                    winnerCount: giveawayPrize.winnerCount,
                };
            }),
        },
    };
};

export const getPreviousGiveaways = async ({page,limit}: GetPreviousGiveawaysInput) => {
    const skip = (page - 1) * limit;

    const filter = {
        status: "ENDED" as const,
    };

    const [giveaways, total] = await Promise.all([
        GiveawayModel.find(filter)
            .sort({ endAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        GiveawayModel.countDocuments(filter),
    ]);

    return {
        giveaways: giveaways.map((giveaway) => ({
            id: giveaway._id.toString(),
            title: giveaway.title,
            slug: giveaway.slug,
            description: giveaway.description,
            status: giveaway.status,
            startAt: giveaway.startAt,
            endAt: giveaway.endAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getMyGiveawayStatus = async ({giveawayId,userId}: {
    giveawayId: string;
    userId: string;
}) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(
            404,
            "GIVEAWAY_NOT_FOUND",
            "Giveaway not found",
        );
    }

    const participation = await GiveawayParticipationModel.findOne({userId,giveawayId}).lean();

    if (!participation) {
        return {
            participation: null,
        };
    }

    return {
        participation: {
            id: participation._id.toString(),
            giveawayId: participation.giveawayId.toString(),
            prizeId: participation.prizeId.toString(),
            entryCurrency: participation.entryCurrency,
            entryAmount: participation.entryAmount,
            status: participation.status,
            joinedAt: participation.joinedAt,
        },
    };
};