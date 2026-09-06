import { GiveawayModel } from "../models/giveaway.model.js";
import { GiveawayParticipationModel } from "../models/giveawayParticipation.model.js";
import { GiveawayPrizeModel } from "../models/giveawayPrize.model.js";
import { GiveawayWinnerModel } from "../models/giveawayWinner.model.js";
import { PrizeModel } from "../models/prize.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { GetPreviousGiveawaysInput, GetPreviousWinnersInput } from "../validators/giveaway.validators.js";

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
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    const giveawayPrizes = await GiveawayPrizeModel.find({ giveawayId: giveaway._id })
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

export const getPreviousGiveaways = async ({ page, limit }: GetPreviousGiveawaysInput) => {
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

export const getMyGiveawayStatus = async ({ giveawayId, userId }: {
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

    const participation = await GiveawayParticipationModel.findOne({ userId, giveawayId }).lean();

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

export const getGiveawayWinners = async (giveawayId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId).select("_id").lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found",);
    }

    const winners = await GiveawayWinnerModel.find({
        giveawayId,
        status: "SELECTED",
    })
        .sort({ selectedAt: 1 })
        .lean();

    if (winners.length === 0) {
        return {
            winners: [],
        };
    }

    const userIds = winners.map((winner) => winner.userId);
    const prizeIds = winners.map((winner) => winner.prizeId);

    const [users, prizes] = await Promise.all([
        UserModel.find({
            _id: {
                $in: userIds,
            },
        })
            .select("_id name")
            .lean(),

        PrizeModel.find({
            _id: {
                $in: prizeIds,
            },
        })
            .select("_id name image type")
            .lean(),
    ]);

    const userMap = new Map(
        users.map((user) => [
            user._id.toString(),
            user,
        ]),
    );

    const prizeMap = new Map(
        prizes.map((prize) => [
            prize._id.toString(),
            prize,
        ]),
    );

    return {
        winners: winners.map((winner) => {
            const user = userMap.get(
                winner.userId.toString(),
            );

            const prize = prizeMap.get(
                winner.prizeId.toString(),
            );

            return {
                id: winner._id.toString(),
                user: user
                    ? {
                        id: user._id.toString(),
                        name: user.name,
                    }
                    : null,
                prize: prize
                    ? {
                        id: prize._id.toString(),
                        name: prize.name,
                        image: prize.image,
                        type: prize.type,
                    }
                    : null,
                selectionMethod: winner.selectionMethod,
                selectedAt: winner.selectedAt,
            };
        }),
    };
};

export const getPreviousWinners = async ({ page, limit }: GetPreviousWinnersInput) => {
    const skip = (page - 1) * limit;

    const filter = {
        status: "SELECTED" as const,
    };

    const [winners, total] = await Promise.all([
        GiveawayWinnerModel.find(filter)
            .sort({ selectedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        GiveawayWinnerModel.countDocuments(filter),
    ]);

    if (winners.length === 0) {
        return {
            winners: [],
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    const giveawayIds = winners.map((winner) => winner.giveawayId);

    const userIds = winners.map((winner) => winner.userId);

    const prizeIds = winners.map((winner) => winner.prizeId);

    const [giveaways, users, prizes] = await Promise.all([
        GiveawayModel.find({
            _id: {
                $in: giveawayIds,
            },
        })
            .select("_id title slug")
            .lean(),

        UserModel.find({
            _id: {
                $in: userIds,
            },
        })
            .select("_id name")
            .lean(),

        PrizeModel.find({
            _id: {
                $in: prizeIds,
            },
        })
            .select("_id name image type")
            .lean(),
    ]);

    const giveawayMap = new Map(
        giveaways.map((giveaway) => [
            giveaway._id.toString(),
            giveaway,
        ]),
    );

    const userMap = new Map(
        users.map((user) => [
            user._id.toString(),
            user,
        ]),
    );

    const prizeMap = new Map(
        prizes.map((prize) => [
            prize._id.toString(),
            prize,
        ]),
    );

    return {
        winners: winners.map((winner) => {
            const giveaway = giveawayMap.get(winner.giveawayId.toString());

            const user = userMap.get(winner.userId.toString());

            const prize = prizeMap.get(winner.prizeId.toString());

            return {
                id: winner._id.toString(),

                giveaway: giveaway
                    ? {
                        id: giveaway._id.toString(),
                        title: giveaway.title,
                        slug: giveaway.slug,
                    }
                    : null,

                user: user
                    ? {
                        id: user._id.toString(),
                        name: user.name,
                    }
                    : null,

                prize: prize
                    ? {
                        id: prize._id.toString(),
                        name: prize.name,
                        image: prize.image,
                        type: prize.type,
                    }
                    : null,

                selectionMethod: winner.selectionMethod,
                selectedAt: winner.selectedAt,
            };
        }),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};