import { RewardLedgerModel } from "../models/rewardLedger.model.js";

type GetMyRewardsInput = {
    userId: string;
    page: number;
    limit: number;
};

export const getMyRewards = async ({ userId, page, limit }: GetMyRewardsInput) => {
    const skip = (page - 1) * limit;

    const [rewards, total] = await Promise.all([
        RewardLedgerModel.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        RewardLedgerModel.countDocuments({ userId }),
    ]);

    return {
        rewards: rewards.map((reward) => ({
            id: reward._id.toString(),
            referralId: reward.referralId.toString(),
            milestoneId: reward.milestoneId.toString(),
            milestoneRewardId: reward.milestoneRewardId.toString(),
            rewardType: reward.rewardType,
            amount: reward.amount,
            referenceId: reward.referenceId,
            balanceBefore: reward.balanceBefore,
            balanceAfter: reward.balanceAfter,
            status: reward.status,
            reason: reward.reason,
            createdAt: reward.createdAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};