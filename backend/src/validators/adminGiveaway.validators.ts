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

export type UpdateGiveawayInput = z.infer<typeof updateGiveawaySchema>;
export type CreateGiveawayInput = z.infer<typeof createGiveawaySchema>;