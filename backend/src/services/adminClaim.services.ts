import { GiveawayWinnerModel } from "../models/giveawayWinner.model.js";
import { PrizeClaimModel } from "../models/prizeClaim.model.js";
import { ApiError } from "../utils/ApiError.js";
import { createAuditLog } from "../utils/auditlog.js";

const validateClaimIntegrity = async (claimId: string) => {
    const claim = await PrizeClaimModel.findById(claimId)
        .select("_id userId giveawayId prizeId winnerId status")
        .lean();

    if (!claim) {
        throw new ApiError(404, "CLAIM_NOT_FOUND", "Prize claim not found");
    }

    const winner = await GiveawayWinnerModel.findOne({
        _id: claim.winnerId,
        status: "SELECTED",
    })
        .select("_id userId giveawayId prizeId status")
        .lean();

    if (!winner) {
        throw new ApiError(409, "CLAIM_WINNER_INVALID", "Claim is not associated with a valid selected winner");
    }

    const isConsistent =
        winner.userId.toString() === claim.userId.toString() &&
        winner.giveawayId.toString() === claim.giveawayId.toString() &&
        winner.prizeId.toString() === claim.prizeId.toString();

    if (!isConsistent) {
        throw new ApiError(409, "CLAIM_INTEGRITY_ERROR", "Claim details do not match the associated winner");
    }

    return claim;
};

export const processPrizeClaim = async (claimId: string, userId: string) => {
    const claim = await validateClaimIntegrity(claimId);

    const processedClaim = await PrizeClaimModel.findOneAndUpdate(
        {
            _id: claim._id,
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

    if (processedClaim) {
        await createAuditLog({
            userId,
            giveawayId: processedClaim.giveawayId.toString(),
            action: "CLAIM_PROCESSED",
            result: "SUCCESS",
            securityInfo: {
                claimId: processedClaim._id.toString(),
                winnerId: processedClaim.winnerId.toString(),
                prizeId: processedClaim.prizeId.toString(),
            },
        });

        return processedClaim;
    }

    throw new ApiError(400, "CLAIM_CANNOT_BE_PROCESSED", `Claim cannot be processed from status ${claim.status}`);
};

export const completePrizeClaim = async (claimId: string, userId: string) => {
    const claim = await validateClaimIntegrity(claimId);

    const completedClaim = await PrizeClaimModel.findOneAndUpdate(
        {
            _id: claim._id,
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

    if (completedClaim) {
        await createAuditLog({
            userId,
            giveawayId: completedClaim.giveawayId.toString(),
            action: "CLAIM_COMPLETED",
            result: "SUCCESS",
            securityInfo: {
                claimId: completedClaim._id.toString(),
                winnerId: completedClaim.winnerId.toString(),
                prizeId: completedClaim.prizeId.toString(),
            },
        });

        return completedClaim;
    }

    throw new ApiError(400, "CLAIM_CANNOT_BE_COMPLETED", `Claim cannot be completed from status ${claim.status}`);
};