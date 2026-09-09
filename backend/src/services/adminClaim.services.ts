import { PrizeClaimModel } from "../models/prizeClaim.model.js";
import { ApiError } from "../utils/ApiError.js";

export const processPrizeClaim = async (claimId: string) => {
    const claim = await PrizeClaimModel.findOneAndUpdate(
        {
            _id: claimId,
            status: "SUBMITTED",
        },
        {
            $set: {
                status: "PROCESSING",
                processedAt: new Date(),
            },
        },
        {
            new: true,
        },
    ).lean();

    if (claim) {
        return claim;
    }

    const existingClaim = await PrizeClaimModel.findById(claimId)
        .select("_id status")
        .lean();

    if (!existingClaim) {
        throw new ApiError(404, "CLAIM_NOT_FOUND", "Prize claim not found");
    }

    throw new ApiError(400, "CLAIM_CANNOT_BE_PROCESSED", `Claim cannot be processed from status ${existingClaim.status}`);
};

export const completePrizeClaim = async (claimId: string) => {
    const claim = await PrizeClaimModel.findOneAndUpdate(
        {
            _id: claimId,
            status: "PROCESSING",
        },
        {
            $set: {
                status: "COMPLETED",
                completedAt: new Date(),
            },
        },
        {
            new: true,
        },
    ).lean();

    if (claim) {
        return claim;
    }

    const existingClaim = await PrizeClaimModel.findById(claimId)
        .select("_id status")
        .lean();

    if (!existingClaim) {
        throw new ApiError(404, "CLAIM_NOT_FOUND", "Prize claim not found");
    }

    throw new ApiError(400, "CLAIM_CANNOT_BE_COMPLETED", `Claim cannot be completed from status ${existingClaim.status}`);
};