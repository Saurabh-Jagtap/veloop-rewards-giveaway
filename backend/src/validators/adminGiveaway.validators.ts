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

export type CreateGiveawayInput = z.infer<typeof createGiveawaySchema>;