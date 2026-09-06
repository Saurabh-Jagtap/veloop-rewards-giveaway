import { z } from "zod";

export const giveawayIdParamSchema = z.object({
    giveawayId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid giveaway ID"),
});


export const getPreviousGiveawaysSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type GiveawayIdParam = z.infer<typeof giveawayIdParamSchema>;
export type GetPreviousGiveawaysInput = z.infer<typeof getPreviousGiveawaysSchema>;