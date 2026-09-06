import { AdWatchEventModel } from "../models/adwatchEvent.model.js";
import { ReferralModel } from "../models/referral.model.js";
import { ApiError } from "../utils/ApiError.js";

type CreateAdWatchInput = {
    eventId: string;
    userId: string;
};

type GetMyAdWatchesInput = {
    userId: string;
    page: number;
    limit: number;
};

export const createAdWatch = async ({ eventId, userId }: CreateAdWatchInput) => {
    const referral = await ReferralModel.findOne({
        referredUserId: userId,
    });

    if (!referral) {
        throw new ApiError(
            404,
            "REFERRAL_NOT_FOUND",
            "Referral relationship not found",
        );
    }

    const existingEvent = await AdWatchEventModel.findOne({
        eventId,
    });

    if (existingEvent) {
        return {
            id: existingEvent._id.toString(),
            eventId: existingEvent.eventId,
            userId: existingEvent.userId.toString(),
            referralId: existingEvent.referralId.toString(),
            status: existingEvent.status,
            watchedAt: existingEvent.watchedAt,
            duplicate: true,
        };
    }

    try {
        const adWatchEvent = await AdWatchEventModel.create({
            eventId,
            userId,
            referralId: referral._id,
            status: "VERIFIED",
            watchedAt: new Date(),
        });

        return {
            id: adWatchEvent._id.toString(),
            eventId: adWatchEvent.eventId,
            userId: adWatchEvent.userId.toString(),
            referralId: adWatchEvent.referralId.toString(),
            status: adWatchEvent.status,
            watchedAt: adWatchEvent.watchedAt,
            duplicate: false,
        };
    } catch (error: any) {
        if (error?.code === 11000) {
            const existingEvent = await AdWatchEventModel.findOne({ eventId });

            if (existingEvent) {
                return {
                    id: existingEvent._id.toString(),
                    eventId: existingEvent.eventId,
                    userId: existingEvent.userId.toString(),
                    referralId: existingEvent.referralId.toString(),
                    status: existingEvent.status,
                    watchedAt: existingEvent.watchedAt,
                    duplicate: true,
                };
            }
        }

        throw error;
    }
};

export const getMyAdWatches = async ({ userId, page, limit }: GetMyAdWatchesInput) => {
    const skip = (page - 1) * limit;

    const [adWatches, total] = await Promise.all([
        AdWatchEventModel.find({ userId })
            .sort({ watchedAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        AdWatchEventModel.countDocuments({ userId }),
    ]);

    return {
        adWatches: adWatches.map((event) => ({
            id: event._id.toString(),
            eventId: event.eventId,
            userId: event.userId.toString(),
            referralId: event.referralId.toString(),
            status: event.status,
            watchedAt: event.watchedAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};