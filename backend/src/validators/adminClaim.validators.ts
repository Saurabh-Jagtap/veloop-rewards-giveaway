import { z } from "zod";

export const claimIdParamSchema = z.object({
    claimId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid claim ID"),
});

export type ClaimIdParam = z.infer<typeof claimIdParamSchema>;