import { z } from "zod";

export const giveawayIdParamSchema = z.object({
    giveawayId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid giveaway ID"),
});


export const getPreviousGiveawaysSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const getPreviousWinnersSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const submitGiveawayClaimSchema = z.object({
    name: z.string().trim().min(1).max(100).optional(),
    phone: z.string().trim().min(10).max(15).optional(),
    address: z.string().trim().min(1).max(500).optional(),
    city: z.string().trim().min(1).max(100).optional(),
    state: z.string().trim().min(1).max(100).optional(),
    pin: z.string().trim().regex(/^\d{6}$/, "Invalid PIN").optional(),
    email: z.string().trim().email().optional(),
})
    .strict();


export type GiveawayIdParam = z.infer<typeof giveawayIdParamSchema>;
export type GetPreviousGiveawaysInput = z.infer<typeof getPreviousGiveawaysSchema>;
export type GetPreviousWinnersInput = z.infer<typeof getPreviousWinnersSchema>;
export type SubmitGiveawayClaimInput = z.infer<typeof submitGiveawayClaimSchema>;