import { z } from "zod";

export const createReferralSchema = z.object({
    referralCode: z.string().trim().min(1, "Referral code is required").max(50, "Referral code is too long"),
});

export const getMyReferralsSchema = z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type CreateReferralInput = z.infer<typeof createReferralSchema>;
export type GetMyReferralsInput = z.infer<typeof getMyReferralsSchema>;