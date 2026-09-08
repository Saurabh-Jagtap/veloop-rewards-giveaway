import { GiveawayModel } from "../models/giveaway.model.js";
import { ApiError } from "../utils/ApiError.js";
import type { CreateGiveawayInput } from "../validators/adminGiveaway.validators.js";

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