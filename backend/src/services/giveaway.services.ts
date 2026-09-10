import mongoose from "mongoose";
import { GiveawayModel } from "../models/giveaway.model.js";
import { GiveawayParticipationModel } from "../models/giveawayParticipation.model.js";
import { GiveawayPrizeModel } from "../models/giveawayPrize.model.js";
import { GiveawayWinnerModel } from "../models/giveawayWinner.model.js";
import { PrizeModel } from "../models/prize.model.js";
import { UserModel } from "../models/user.model.js";
import { WalletModel } from "../models/wallet.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { GetPreviousGiveawaysInput, GetPreviousWinnersInput, SubmitGiveawayClaimInput } from "../validators/giveaway.validators.js";
import { GiveawayEntryTransactionModel } from "../models/giveawayEntryTransaction.model.js";
import { PrizeClaimModel } from "../models/prizeClaim.model.js";

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

export const joinGiveaway = async ({ giveawayId, userId, deviceHash }: {
    giveawayId: string;
    userId: string;
    deviceHash: string;
}) => {
    const now = new Date();

    // 1. Load giveaway
    const giveaway = await GiveawayModel.findById(giveawayId).lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    // 2. Check giveaway status
    if (giveaway.status !== "ACTIVE") {
        if (giveaway.status === "ENDED") {
            throw new ApiError(400, "GIVEAWAY_ENDED", "Giveaway has ended");
        }

        throw new ApiError(400, "GIVEAWAY_NOT_ACTIVE", "Giveaway is not currently active");
    }

    // 3. Check actual start/end time
    if (now < giveaway.startAt) {
        throw new ApiError(400, "GIVEAWAY_NOT_ACTIVE", "Giveaway has not started yet",
        );
    }

    if (now >= giveaway.endAt) {
        throw new ApiError(400, "GIVEAWAY_ENDED", "Giveaway has ended");
    }

    // 4. Current implementation supports exactly one prize
    const giveawayPrizes = await GiveawayPrizeModel.find({ giveawayId: giveaway._id })
        .sort({ position: 1 })
        .lean();

    if (giveawayPrizes.length !== 1) {
        throw new ApiError(500, "GIVEAWAY_CONFIGURATION_INVALID", "Giveaway must have exactly one prize configuration");
    }

    const giveawayPrize = giveawayPrizes[0];

    // Explicitly narrow the type for TypeScript
    if (!giveawayPrize) {
        throw new ApiError(500, "GIVEAWAY_CONFIGURATION_INVALID", "Giveaway prize configuration is missing");
    }

    // 5. Verify the referenced prize exists
    const prize = await PrizeModel.findById(giveawayPrize.prizeId).select("_id").lean();

    if (!prize) {
        throw new ApiError(500, "GIVEAWAY_CONFIGURATION_INVALID", "Giveaway prize configuration is invalid");
    }

    // 6. Check whether the user already participated
    const existingParticipation = await GiveawayParticipationModel.findOne({ userId, giveawayId: giveaway._id })
        .select("_id")
        .lean();

    if (existingParticipation) {
        throw new ApiError(409, "ALREADY_PARTICIPATING", "User is already participating in this giveaway");
    }

    // 7. Start MongoDB transaction
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        // 8. Load authoritative wallet
        const wallet = await WalletModel.findOne({
            userId,
        }).session(session);

        if (!wallet) {
            throw new ApiError(404, "WALLET_NOT_FOUND", "Wallet not found");
        }

        const currency = giveawayPrize.entryCurrency;
        const amount = giveawayPrize.entryAmount;

        // 9. Resolve the correct wallet balance
        const balanceBefore = getWalletBalance(wallet, currency);

        if (balanceBefore === null) {
            throw new ApiError(400, "INVALID_ENTRY_CURRENCY", "Giveaway entry currency is not supported");
        }

        if (balanceBefore < amount) {
            throw new ApiError(400, getInsufficientBalanceCode(currency), `Insufficient ${currency} balance`);
        }

        const balanceAfter = balanceBefore - amount;

        // Resolve wallet field once
        const walletField = getWalletField(currency);

        if (!walletField) {
            throw new ApiError(400, "INVALID_ENTRY_CURRENCY", "Giveaway entry currency is not supported");
        }

        // 10. Deduct the balance atomically
        const walletUpdate = await WalletModel.updateOne(
            {
                _id: wallet._id,
                [walletField]: {
                    $gte: amount,
                },
            },
            {
                $inc: {
                    [walletField]: -amount,
                },
            },
            {
                session,
            },
        );

        if (walletUpdate.modifiedCount !== 1) {
            throw new ApiError(400, getInsufficientBalanceCode(currency), `Insufficient ${currency} balance`);
        }

        // 11. Create transaction record
        const transactionId = crypto.randomUUID();

        const [entryTransaction] = await GiveawayEntryTransactionModel.create(
            [
                {
                    userId,
                    giveawayId: giveaway._id,
                    prizeId: giveawayPrize.prizeId,
                    transactionId,
                    currency,
                    amount,
                    type: "ENTRY_FEE",
                    status: "SUCCESS",
                    balanceBefore,
                    balanceAfter,
                },
            ],
            {
                session,
            },
        );

        if (!entryTransaction) {
            throw new Error("ENTRY_TRANSACTION_CREATION_FAILED");
        }

        // 12. Create participation
        const [participation] = await GiveawayParticipationModel.create(
            [
                {
                    userId,
                    giveawayId: giveaway._id,
                    prizeId: giveawayPrize.prizeId,
                    transactionId: entryTransaction._id,
                    entryCurrency: currency,
                    entryAmount: amount,
                    deviceHash,
                    status: "ACTIVE",
                    joinedAt: now,
                },
            ],
            {
                session,
            },
        );

        if (!participation) {
            throw new Error("PARTICIPATION_CREATION_FAILED");
        }

        // 13. Commit everything together
        await session.commitTransaction();

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

            transaction: {
                id: entryTransaction._id.toString(),
                transactionId: entryTransaction.transactionId,
                currency: entryTransaction.currency,
                amount: entryTransaction.amount,
                balanceBefore: entryTransaction.balanceBefore,
                balanceAfter: entryTransaction.balanceAfter,
                status: entryTransaction.status,
            },
        };
    } catch (error: any) {
        await session.abortTransaction();

        // Handle concurrent duplicate participation attempts
        if (
            error?.code === 11000 &&
            error?.keyPattern?.userId &&
            error?.keyPattern?.giveawayId
        ) {
            throw new ApiError(409, "ALREADY_PARTICIPATING", "User is already participating in this giveaway");
        }

        throw error;
    } finally {
        await session.endSession();
    }
};

const getWalletField = (currency: string):
    | "veBalance"
    | "sveBalance"
    | "tokenBalance"
    | "gemBalance"
    | "spinBalance"
    | "xpBalance"
    | null => {
    switch (currency.toUpperCase()) {
        case "VE":
            return "veBalance";

        case "SVE":
            return "sveBalance";

        case "TOKENS":
            return "tokenBalance";

        case "GEMS":
            return "gemBalance";

        case "SPINS":
            return "spinBalance";

        case "XP":
            return "xpBalance";

        default:
            return null;
    }
};

const getWalletBalance = (
    wallet: {
        veBalance: number;
        sveBalance: number;
        tokenBalance: number;
        gemBalance: number;
        spinBalance: number;
        xpBalance: number;
    },
    currency: string,
): number | null => {
    const field = getWalletField(currency);

    if (!field) {
        return null;
    }

    return wallet[field];
};

const getInsufficientBalanceCode = (currency: string): string => {
    switch (currency.toUpperCase()) {
        case "VE":
            return "INSUFFICIENT_VE_BALANCE";

        case "SVE":
            return "INSUFFICIENT_SVE_BALANCE";

        case "TOKENS":
            return "INSUFFICIENT_TOKEN_BALANCE";

        case "GEMS":
            return "INSUFFICIENT_GEM_BALANCE";

        case "SPINS":
            return "INSUFFICIENT_SPIN_BALANCE";

        case "XP":
            return "INSUFFICIENT_XP_BALANCE";

        default:
            return "INSUFFICIENT_BALANCE";
    }
};

export const submitGiveawayClaim = async ({ giveawayId, userId, claimData }: {
    giveawayId: string;
    userId: string;
    claimData: SubmitGiveawayClaimInput;
}) => {
    // 1. Verify giveaway exists
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    // 2. Find the authenticated user's selected winner record
    const winner = await GiveawayWinnerModel.findOne({
        giveawayId,
        userId,
        status: "SELECTED",
    }).lean();

    if (!winner) {
        throw new ApiError(403, "CLAIM_NOT_ALLOWED", "You are not a winner of this giveaway");
    }

    // 3. Load the prize from the database
    const prize = await PrizeModel.findById(winner.prizeId)
        .select("_id name type claimType")
        .lean();

    if (!prize) {
        throw new ApiError(500, "PRIZE_NOT_FOUND", "Winner prize configuration is invalid");
    }

    // 4. Validate claim data according to the authoritative prize type
    let validatedClaimData: Record<string, string>;

    if (prize.type === "PHYSICAL") {
        const requiredFields = ["name", "phone", "address", "city", "state", "pin"] as const;

        const missingFields = requiredFields.filter((field) => !claimData[field]);

        if (missingFields.length > 0) {
            throw new ApiError(400, "INVALID_CLAIM_DATA", `Missing required claim information: ${missingFields.join(", ")}`);
        }

        validatedClaimData = {
            name: claimData.name!,
            phone: claimData.phone!,
            address: claimData.address!,
            city: claimData.city!,
            state: claimData.state!,
            pin: claimData.pin!,
        };
    } else if (prize.type === "GIFT_CARD") {
        if (!claimData.email) {
            throw new ApiError(400, "INVALID_CLAIM_DATA", "Email is required for gift card claims");
        }

        validatedClaimData = {
            email: claimData.email,
        };
    } else if (prize.type === "DIGITAL") {
        validatedClaimData = {};
    } else {
        throw new ApiError(500, "PRIZE_CONFIGURATION_INVALID", "Prize type is not supported");
    }

    // 5. Prevent duplicate claim submission
    const existingClaim = await PrizeClaimModel.findOne({ winnerId: winner._id }).lean();

    if (existingClaim) {
        throw new ApiError(409, "CLAIM_ALREADY_SUBMITTED", "A claim has already been submitted for this prize");
    }

    // 6. Create the claim
    const submittedAt = new Date();

    const claim = await PrizeClaimModel.create({
        userId,
        giveawayId,
        prizeId: winner.prizeId,
        winnerId: winner._id,
        claimData: validatedClaimData,
        status: "SUBMITTED",
        submittedAt,
    });

    return {
        claim: {
            id: claim._id.toString(),
            giveawayId: claim.giveawayId.toString(),
            prizeId: claim.prizeId.toString(),
            winnerId: claim.winnerId.toString(),
            status: claim.status,
            submittedAt: claim.submittedAt,
        },
        prize: {
            id: prize._id.toString(),
            name: prize.name,
            type: prize.type,
            claimType: prize.claimType,
        },
    };
};

export const getMyGiveawayClaim = async ({ giveawayId, userId }: {
    giveawayId: string;
    userId: string;
}) => {
    // 1. Verify giveaway exists
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    // 2. Find the user's selected winner
    const winner = await GiveawayWinnerModel.findOne({
        giveawayId,
        userId,
        status: "SELECTED",
    })
        .select("_id prizeId status selectedAt")
        .lean();

    // User is not a winner
    if (!winner) {
        throw new ApiError(403, "CLAIM_NOT_ALLOWED", "You are not a winner of this giveaway");
    }

    // 3. Find the claim belonging to this winner
    const claim = await PrizeClaimModel.findOne({
        winnerId: winner._id,
        userId,
        giveawayId,
    }).lean();

    // Winner but hasn't submitted a claim yet
    if (!claim) {
        return {
            claim: null,
            winner: {
                id: winner._id.toString(),
                prizeId: winner.prizeId.toString(),
                status: winner.status,
                selectedAt: winner.selectedAt,
            },
        };
    }

    // 4. Return only safe claim information
    return {
        claim: {
            id: claim._id.toString(),
            giveawayId: claim.giveawayId.toString(),
            prizeId: claim.prizeId.toString(),
            winnerId: claim.winnerId.toString(),
            status: claim.status,
            submittedAt: claim.submittedAt,
            processedAt: claim.processedAt,
            completedAt: claim.completedAt,
            expiresAt: claim.expiresAt,
        },
    };
};