import { GiveawayModel } from "../models/giveaway.model.js";
import { GiveawayParticipationModel } from "../models/giveawayParticipation.model.js";
import { GiveawayPrizeModel } from "../models/giveawayPrize.model.js";
import { GiveawayWinnerModel } from "../models/giveawayWinner.model.js";
import { PrizeModel } from "../models/prize.model.js";
import { ApiError } from "../utils/ApiError.js";
import { randomInt } from "node:crypto";
import mongoose from "mongoose";
import type { AttachPrizeToGiveawayInput, CreateGiveawayInput, GetGiveawayParticipantsInput, UpdateGiveawayInput, UpdateGiveawayPrizeInput } from "../validators/adminGiveaway.validators.js";
import { PrizeClaimModel } from "../models/prizeClaim.model.js";
import { GiveawayEntryTransactionModel } from "../models/giveawayEntryTransaction.model.js";
import { FraudEventModel } from "../models/fraudEvent.model.js";
import { createAuditLog } from "../utils/auditlog.js";

type PopulatedUser = {
    _id: string;
    name: string;
    email: string;
};

type PopulatedPrize = {
    _id: string;
    name: string;
    type: string;
};

export const createGiveaway = async ({
    title,
    slug,
    description,
    rules,
    eligibility,
    participationSettings,
    startAt,
    endAt,
}: CreateGiveawayInput, userId: string) => {
    const existingGiveaway = await GiveawayModel.findOne({ slug })
        .select("_id")
        .lean();

    if (existingGiveaway) {
        throw new ApiError(409, "GIVEAWAY_SLUG_ALREADY_EXISTS", "A giveaway with this slug already exists");
    }

    const giveaway = await GiveawayModel.create({
        title,
        slug,
        description,
        rules,
        eligibility,
        participationSettings,
        startAt,
        endAt,
        status: "UPCOMING",
    });

    try {
        await createAuditLog({
            userId,
            giveawayId: giveaway._id.toString(),
            action: "CREATE_GIVEAWAY",
            result: "SUCCESS",
        });
    } catch (error) {
        console.error("Failed to create audit log:", error);
    }

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
            createdAt: giveaway.createdAt,
            updatedAt: giveaway.updatedAt,
        },
    };
};

export const updateGiveaway = async (giveawayId: string, input: UpdateGiveawayInput, userId: string,) => {
    const giveaway = await GiveawayModel.findById(giveawayId);

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status === "ARCHIVED") {
        throw new ApiError(400, "GIVEAWAY_ARCHIVED", "Archived giveaways cannot be updated");
    }

    const nextStartAt = input.startAt ?? giveaway.startAt;
    const nextEndAt = input.endAt ?? giveaway.endAt;

    if (nextEndAt <= nextStartAt) {
        throw new ApiError(400, "INVALID_GIVEAWAY_TIMELINE", "End time must be after start time");
    }

    if (giveaway.status === "ACTIVE") {
        if (input.startAt) {
            throw new ApiError(400, "ACTIVE_GIVEAWAY_START_TIME_IMMUTABLE", "Start time cannot be changed after the giveaway starts");
        }

        if (input.endAt && input.endAt < giveaway.endAt) {
            throw new ApiError(400, "GIVEAWAY_END_TIME_CANNOT_BE_REDUCED", "Giveaway end time can only be extended");
        }
    }

    if (giveaway.status === "ENDED") {
        throw new ApiError(400, "GIVEAWAY_ENDED", "Ended giveaways cannot be updated");
    }

    const hasParticipation = await GiveawayParticipationModel.exists({
        giveawayId,
    });

    if (hasParticipation && input.eligibility !== undefined) {
        throw new ApiError(409, "GIVEAWAY_CONFIGURATION_LOCKED", "Eligibility cannot be changed after participation has started");
    }

    if (input.startAt) {
        giveaway.startAt = input.startAt;
    }

    if (input.endAt) {
        giveaway.endAt = input.endAt;
    }

    if (input.title !== undefined) {
        giveaway.title = input.title;
    }

    if (input.description !== undefined) {
        giveaway.description = input.description;
    }

    if (input.rules !== undefined) {
        giveaway.rules = input.rules;
    }

    if (input.eligibility !== undefined) {
        giveaway.eligibility = input.eligibility;
    }

    if (input.participationSettings !== undefined) {
        giveaway.participationSettings = input.participationSettings;
    }

    await giveaway.save();

    await createAuditLog({
        userId,
        giveawayId,
        action: "UPDATE_GIVEAWAY",
        result: "SUCCESS",
    });

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
            createdAt: giveaway.createdAt,
            updatedAt: giveaway.updatedAt,
        },
    };
};

export const deleteGiveaway = async (giveawayId: string, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId);

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status === "ENDED" || giveaway.status === "ARCHIVED") {
        throw new ApiError(400, "GIVEAWAY_CANNOT_BE_DELETED", "Ended or archived giveaways cannot be deleted");
    }

    const [hasParticipation, hasTransactions, hasWinners, hasClaims, hasFraudEvents] = await Promise.all([
        GiveawayParticipationModel.exists({ giveawayId }),
        GiveawayEntryTransactionModel.exists({ giveawayId }),
        GiveawayWinnerModel.exists({ giveawayId }),
        PrizeClaimModel.exists({ giveawayId }),
        FraudEventModel.exists({ giveawayId }),
    ]);

    if (hasParticipation || hasTransactions || hasWinners || hasClaims || hasFraudEvents) {
        throw new ApiError(409, "GIVEAWAY_HAS_HISTORY", "Giveaway cannot be deleted because it has historical records");
    }

    await GiveawayModel.deleteOne({ _id: giveawayId });

    await createAuditLog({
        userId,
        action: "DELETE_GIVEAWAY",
        result: "SUCCESS",
        securityInfo: {
            targetGiveawayId: giveawayId,
        },
    });

    return {
        giveawayId,
        deleted: true,
    };
};

export const startGiveaway = async (giveawayId: string, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId);

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status !== "UPCOMING") {
        throw new ApiError(400, "GIVEAWAY_CANNOT_BE_STARTED", "Only upcoming giveaways can be started");
    }

    const activationTime = new Date();

    giveaway.status = "ACTIVE";
    giveaway.startAt = activationTime;

    await giveaway.save();

    await createAuditLog({
        userId,
        giveawayId,
        action: "START_GIVEAWAY",
        result: "SUCCESS",
    });

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
            createdAt: giveaway.createdAt,
            updatedAt: giveaway.updatedAt,
        },
    };
};

export const endGiveaway = async (giveawayId: string, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId);

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status !== "ACTIVE") {
        throw new ApiError(400, "GIVEAWAY_CANNOT_BE_ENDED", "Only active giveaways can be ended");
    }

    giveaway.status = "ENDED";

    await giveaway.save();

    await createAuditLog({
        userId,
        giveawayId,
        action: "END_GIVEAWAY",
        result: "SUCCESS",
    });

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
            createdAt: giveaway.createdAt,
            updatedAt: giveaway.updatedAt,
        },
    };
};

export const attachPrizeToGiveaway = async (giveawayId: string, input: AttachPrizeToGiveawayInput, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id status")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status !== "UPCOMING") {
        throw new ApiError(400, "GIVEAWAY_CONFIGURATION_LOCKED", "Prizes can only be configured for upcoming giveaways");
    }

    const prize = await PrizeModel.findById(input.prizeId)
        .select("_id")
        .lean();

    if (!prize) {
        throw new ApiError(404, "PRIZE_NOT_FOUND", "Prize not found");
    }

    const existingGiveawayPrize = await GiveawayPrizeModel.findOne({ giveawayId, prizeId: input.prizeId })
        .select("_id")
        .lean();

    if (existingGiveawayPrize) {
        throw new ApiError(409, "PRIZE_ALREADY_ATTACHED", "This prize is already attached to the giveaway");
    }

    const giveawayPrize = await GiveawayPrizeModel.create({
        giveawayId,
        prizeId: input.prizeId,
        entryCurrency: input.entryCurrency,
        entryAmount: input.entryAmount,
        position: input.position,
        winnerCount: input.winnerCount,
    });

    await createAuditLog({
        userId,
        giveawayId,
        action: "ATTACH_PRIZE",
        result: "SUCCESS",
        securityInfo: {
            giveawayPrizeId: giveawayPrize._id.toString(),
            prizeId: giveawayPrize.prizeId.toString(),
            entryCurrency: giveawayPrize.entryCurrency,
            entryAmount: giveawayPrize.entryAmount,
            position: giveawayPrize.position,
            winnerCount: giveawayPrize.winnerCount,
        },
    });

    return {
        giveawayPrize: {
            id: giveawayPrize._id.toString(),
            giveawayId: giveawayPrize.giveawayId.toString(),
            prizeId: giveawayPrize.prizeId.toString(),
            entryCurrency: giveawayPrize.entryCurrency,
            entryAmount: giveawayPrize.entryAmount,
            position: giveawayPrize.position,
            winnerCount: giveawayPrize.winnerCount,
            createdAt: giveawayPrize.createdAt,
            updatedAt: giveawayPrize.updatedAt,
        },
    };
};

export const updateGiveawayPrize = async (giveawayId: string, giveawayPrizeId: string,
    input: UpdateGiveawayPrizeInput, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id status")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status !== "UPCOMING") {
        throw new ApiError(400, "GIVEAWAY_CONFIGURATION_LOCKED", "Giveaway prize configuration is locked");
    }

    const giveawayPrize = await GiveawayPrizeModel.findOne({
        _id: giveawayPrizeId,
        giveawayId,
    });

    if (!giveawayPrize) {
        throw new ApiError(404, "GIVEAWAY_PRIZE_NOT_FOUND", "Giveaway prize not found");
    }

    if (input.entryCurrency !== undefined) {
        giveawayPrize.entryCurrency = input.entryCurrency;
    }

    if (input.entryAmount !== undefined) {
        giveawayPrize.entryAmount = input.entryAmount;
    }

    if (input.position !== undefined) {
        giveawayPrize.position = input.position;
    }

    if (input.winnerCount !== undefined) {
        giveawayPrize.winnerCount = input.winnerCount;
    }

    await giveawayPrize.save();

    await createAuditLog({
        userId,
        giveawayId,
        action: "UPDATE_GIVEAWAY_PRIZE",
        securityInfo: {
            giveawayPrizeId,
            prizeId: giveawayPrize.prizeId.toString(),
            entryCurrency: giveawayPrize.entryCurrency,
            entryAmount: giveawayPrize.entryAmount,
            position: giveawayPrize.position,
            winnerCount: giveawayPrize.winnerCount,
        },
        result: "SUCCESS",
    });

    return {
        giveawayPrize: {
            id: giveawayPrize._id.toString(),
            giveawayId: giveawayPrize.giveawayId.toString(),
            prizeId: giveawayPrize.prizeId.toString(),
            entryCurrency: giveawayPrize.entryCurrency,
            entryAmount: giveawayPrize.entryAmount,
            position: giveawayPrize.position,
            winnerCount: giveawayPrize.winnerCount,
            createdAt: giveawayPrize.createdAt,
            updatedAt: giveawayPrize.updatedAt,
        },
    };
};

export const getGiveawayParticipants = async (
    giveawayId: string,
    { page, limit }: GetGiveawayParticipantsInput,
) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    const skip = (page - 1) * limit;

    const [participants, total] = await Promise.all([
        GiveawayParticipationModel.find({ giveawayId })
            .sort({ joinedAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate<{ userId: PopulatedUser }>(
                "userId",
                "_id name email",
            )
            .populate<{ prizeId: PopulatedPrize }>(
                "prizeId",
                "_id name type",
            )
            .lean(),

        GiveawayParticipationModel.countDocuments({ giveawayId }),
    ]);

    return {
        participants: participants.map((participant) => ({
            id: participant._id.toString(),

            user: participant.userId
                ? {
                    id: participant.userId._id.toString(),
                    name: participant.userId.name,
                    email: participant.userId.email,
                }
                : null,

            prize: participant.prizeId
                ? {
                    id: participant.prizeId._id.toString(),
                    name: participant.prizeId.name,
                    type: participant.prizeId.type,
                }
                : null,

            entryCurrency: participant.entryCurrency,
            entryAmount: participant.entryAmount,
            status: participant.status,
            joinedAt: participant.joinedAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const selectGiveawayWinners = async (giveawayId: string, userId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id status winnersFinalizedAt")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    if (giveaway.status !== "ENDED") {
        throw new ApiError(400, "GIVEAWAY_NOT_ENDED", "Winners can only be selected after the giveaway has ended");
    }

    const session = await mongoose.startSession();

    try {
        const result = await session.withTransaction(async () => {
            /*
             * Atomically claim winner finalization.
             *
             * Only the first request can change winnersFinalizedAt
             * from "not finalized" to a timestamp.
             *
             * Concurrent requests that lose this race will retry
             * their transaction and then see the finalized giveaway.
             */
            const finalizedGiveaway = await GiveawayModel.findOneAndUpdate(
                {
                    _id: giveawayId,
                    status: "ENDED",
                    winnersFinalizedAt: {
                        $exists: false,
                    },
                },
                {
                    $set: {
                        winnersFinalizedAt: new Date(),
                    },
                },
                {
                    new: true,
                    session,
                },
            ).lean();

            if (!finalizedGiveaway) {
                const existingWinners = await GiveawayWinnerModel.find({
                    giveawayId,
                })
                    .sort({ prizeId: 1, selectedAt: 1 })
                    .lean()
                    .session(session);

                if (existingWinners.length === 0) {
                    throw new ApiError(500, "WINNER_FINALIZATION_INCONSISTENT", "Winner selection is marked as finalized but no winners were found");
                }

                return {
                    finalized: true,
                    winners: existingWinners.map((winner) => ({
                        id: winner._id.toString(),
                        userId: winner.userId.toString(),
                        giveawayId: winner.giveawayId.toString(),
                        prizeId: winner.prizeId.toString(),
                        selectionMethod: winner.selectionMethod,
                        status: winner.status,
                        selectedAt: winner.selectedAt,
                    })),
                };
            }

            const giveawayPrizes = await GiveawayPrizeModel.find({
                giveawayId,
            })
                .sort({ position: 1 })
                .lean()
                .session(session);

            if (giveawayPrizes.length === 0) {
                throw new ApiError(400, "NO_PRIZES_CONFIGURED", "No prizes are configured for this giveaway");
            }

            const selectedWinners = [];

            for (const giveawayPrize of giveawayPrizes) {
                const participants =
                    await GiveawayParticipationModel.find({
                        giveawayId,
                        prizeId: giveawayPrize.prizeId,
                        status: "ACTIVE",
                    })
                        .select("userId")
                        .lean()
                        .session(session);

                if (participants.length < giveawayPrize.winnerCount) {
                    throw new ApiError(400, "INSUFFICIENT_PARTICIPANTS", `Not enough participants for prize ${giveawayPrize.prizeId.toString()}`);
                }

                const shuffledParticipants = [...participants];

                for (
                    let currentIndex = shuffledParticipants.length - 1;
                    currentIndex > 0;
                    currentIndex--
                ) {
                    const randomIndex = randomInt(currentIndex + 1);

                    const currentParticipant = shuffledParticipants[currentIndex];

                    const randomParticipant = shuffledParticipants[randomIndex];

                    if (!currentParticipant || !randomParticipant) {
                        throw new ApiError(500, "WINNER_SELECTION_ERROR", "Unable to shuffle participants");
                    }

                    shuffledParticipants[currentIndex] = randomParticipant;
                    shuffledParticipants[randomIndex] = currentParticipant;
                }

                const winnersForPrize = shuffledParticipants.slice(
                    0,
                    giveawayPrize.winnerCount,
                );

                for (const participant of winnersForPrize) {
                    selectedWinners.push({
                        userId: participant.userId,
                        giveawayId,
                        prizeId: giveawayPrize.prizeId,
                        selectionMethod: "RANDOM" as const,
                        status: "SELECTED" as const,
                        selectedAt: new Date(),
                    });
                }
            }

            if (selectedWinners.length === 0) {
                throw new ApiError(400, "NO_WINNERS_SELECTED", "No winners could be selected");
            }

            await GiveawayWinnerModel.insertMany(
                selectedWinners,
                {
                    session,
                    ordered: true,
                },
            );

            return {
                finalized: true,
                winners: selectedWinners.map((winner) => ({
                    userId: winner.userId.toString(),
                    giveawayId: winner.giveawayId.toString(),
                    prizeId: winner.prizeId.toString(),
                    selectionMethod: winner.selectionMethod,
                    status: winner.status,
                    selectedAt: winner.selectedAt,
                })),
            };
        });

        await createAuditLog({
            userId,
            giveawayId,
            action: "WINNERS_SELECTED",
            result: "SUCCESS",
            securityInfo: {
                winnerCount: result.winners.length,
            },
        });

        return result;
    } catch (error) {
        throw error;
    } finally {
        await session.endSession();
    }
};

export const getGiveawayWinners = async (giveawayId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    const winners = await GiveawayWinnerModel.find({
        giveawayId,
    })
        .sort({ selectedAt: 1 })
        .populate<{ userId: PopulatedUser }>(
            "userId",
            "_id name email",
        )
        .populate<{ prizeId: PopulatedPrize }>(
            "prizeId",
            "_id name type",
        )
        .lean();

    return {
        winners: winners.map((winner) => ({
            id: winner._id.toString(),

            user: winner.userId
                ? {
                    id: winner.userId._id.toString(),
                    name: winner.userId.name,
                    email: winner.userId.email,
                }
                : null,

            prize: winner.prizeId
                ? {
                    id: winner.prizeId._id.toString(),
                    name: winner.prizeId.name,
                    type: winner.prizeId.type,
                }
                : null,

            selectionMethod: winner.selectionMethod,
            status: winner.status,
            selectedAt: winner.selectedAt,
        })),
    };
};

export const getGiveawayClaims = async (giveawayId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId)
        .select("_id")
        .lean();

    if (!giveaway) {
        throw new ApiError(404, "GIVEAWAY_NOT_FOUND", "Giveaway not found");
    }

    const claims = await PrizeClaimModel.find({
        giveawayId,
    })
        .sort({ createdAt: -1 })
        .populate<{ userId: PopulatedUser }>(
            "userId",
            "_id name email",
        )
        .populate<{ prizeId: PopulatedPrize }>(
            "prizeId",
            "_id name type",
        )
        .lean();

    return {
        claims: claims.map((claim) => ({
            id: claim._id.toString(),

            user: claim.userId
                ? {
                    id: claim.userId._id.toString(),
                    name: claim.userId.name,
                    email: claim.userId.email,
                }
                : null,

            prize: claim.prizeId
                ? {
                    id: claim.prizeId._id.toString(),
                    name: claim.prizeId.name,
                    type: claim.prizeId.type,
                }
                : null,

            winnerId: claim.winnerId.toString(),

            status: claim.status,

            submittedAt: claim.submittedAt,
            processedAt: claim.processedAt,
            completedAt: claim.completedAt,
            expiresAt: claim.expiresAt,

            createdAt: claim.createdAt,
            updatedAt: claim.updatedAt,
        })),
    };
};
