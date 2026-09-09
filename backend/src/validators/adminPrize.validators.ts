import { z } from "zod";

export const createPrizeSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),

    position: z.coerce.number().int().min(1, "Position must be at least 1"),
    image: z.string().trim().min(1, "Image is required"),

    description: z.string().trim().min(1, "Description is required"),
    winnerCount: z.coerce.number().int().min(1, "Winner count must be at least 1"),

    type: z.enum(["PHYSICAL", "GIFT_CARD", "DIGITAL"]),
    claimType: z.string().trim().min(1, "Claim type is required"),
});

export type CreatePrizeInput = z.infer<typeof createPrizeSchema>;