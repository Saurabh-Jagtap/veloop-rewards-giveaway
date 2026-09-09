import { GiveawayModel } from "../models/giveaway.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateGiveawayInput, UpdateGiveawayInput } from "../validators/adminGiveaway.validators.js";

export const createGiveaway = async ({
    title,
    slug,
    description,
    rules,
    eligibility,
    participationSettings,
    startAt,
    endAt,
}: CreateGiveawayInput) => {
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

export const updateGiveaway = async (giveawayId: string, input: UpdateGiveawayInput) => {
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

export const deleteGiveaway = async (giveawayId: string) => {
    const giveaway = await GiveawayModel.findById(giveawayId);

    if (!giveaway) {
        throw new ApiError(404,"GIVEAWAY_NOT_FOUND","Giveaway not found");
    }

    if (giveaway.status === "ENDED" || giveaway.status === "ARCHIVED") {
        throw new ApiError(400,"GIVEAWAY_CANNOT_BE_DELETED","Ended or archived giveaways cannot be deleted");
    }

    await GiveawayModel.deleteOne({ _id: giveawayId });

    return {
        giveawayId,
        deleted: true,
    };
};