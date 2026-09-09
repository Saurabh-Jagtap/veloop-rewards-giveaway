import { z } from "zod";

export const createGiveawaySchema = z.object({
    title: z.string().trim().min(1, "Title is required"),

    slug: z.string().trim().min(1, "Slug is required").regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain only lowercase letters, numbers and hyphens",
    ),

    description: z.string().trim().min(1, "Description is required"),
    rules: z.string().trim().min(1, "Rules are required"),
    eligibility: z.string().trim().min(1, "Eligibility is required"),

    participationSettings: z.string().trim().min(1, "Participation settings are required"),

    startAt: z.coerce.date(),
    endAt: z.coerce.date(),
}).superRefine((data, ctx) => {
    if (data.endAt <= data.startAt) {
        ctx.addIssue({
            code: "custom",
            path: ["endAt"],
            message: "End time must be after start time",
        });
    }
});

export const updateGiveawaySchema = z.object({
    title: z.string().trim().min(1, "Title cannot be empty").optional(),
    description: z.string().trim().min(1, "Description cannot be empty").optional(),

    rules: z.string().trim().min(1, "Rules cannot be empty").optional(),
    eligibility: z.string().trim().min(1, "Eligibility cannot be empty").optional(),
    participationSettings: z.string().trim().min(1, "Participation settings cannot be empty").optional(),

    startAt: z.coerce.date().optional(),
    endAt: z.coerce.date().optional(),
})
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided",
        },
    );

export const attachPrizeToGiveawaySchema = z.object({
    prizeId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid prize ID"),

    entryCurrency: z.string().trim().min(1, "Entry currency is required"),
    entryAmount: z.coerce.number().min(0, "Entry amount cannot be negative"),

    position: z.coerce.number().int().min(1, "Position must be at least 1"),
    winnerCount: z.coerce.number().int().min(1, "Winner count must be at least 1"),
});

export const giveawayPrizeIdParamsSchema = z.object({
    giveawayId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid giveaway ID",
    ),

    giveawayPrizeId: z.string().regex(
        /^[0-9a-fA-F]{24}$/,
        "Invalid giveaway prize ID",
    ),
});

export const updateGiveawayPrizeSchema = z.object({
    entryCurrency: z.string().trim().min(1, "Entry currency cannot be empty").optional(),
    entryAmount: z.coerce.number().min(0, "Entry amount cannot be negative").optional(),

    position: z.coerce.number().int().min(1, "Position must be at least 1").optional(),
    winnerCount: z.coerce.number().int().min(1, "Winner count must be at least 1").optional(),
})
    .refine(
        (data) => Object.keys(data).length > 0,
        {
            message: "At least one field must be provided",
        },
    );

export const getGiveawayParticipantsSchema = z.object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
    limit: z.coerce.number().int().min(1, "Limit must be at least 1").max(100, "Limit cannot exceed 100").default(20),
});

export type UpdateGiveawayInput = z.infer<typeof updateGiveawaySchema>;
export type CreateGiveawayInput = z.infer<typeof createGiveawaySchema>;
export type AttachPrizeToGiveawayInput = z.infer<typeof attachPrizeToGiveawaySchema>;
export type UpdateGiveawayPrizeInput = z.infer<typeof updateGiveawayPrizeSchema>;
export type GetGiveawayParticipantsInput = z.infer<typeof getGiveawayParticipantsSchema>;