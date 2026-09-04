import crypto from "node:crypto";

const REFERRAL_CODE_LENGTH = 8;

export const generateReferralCode = (): string => {
    return crypto
        .randomBytes(REFERRAL_CODE_LENGTH)
        .toString("hex")
        .slice(0, REFERRAL_CODE_LENGTH)
        .toUpperCase();
};