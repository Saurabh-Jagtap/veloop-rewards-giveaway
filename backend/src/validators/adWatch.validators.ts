import { z } from "zod";

export const createAdWatchSchema = z.object({
    eventId: z.string().trim().min(1, "Event ID is required").max(100, "Event ID must be at most 100 characters")
});

export const getMyAdWatchesSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),

    limit: z.coerce.number().int().min(1).max(100).default(20)
});

export type CreateAdWatchInput = z.infer<typeof createAdWatchSchema>;
export type GetMyAdWatchesInput = z.infer<typeof getMyAdWatchesSchema>;