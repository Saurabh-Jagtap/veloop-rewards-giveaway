import { AdWatchEventModel } from "../models/adwatchEvent.model.js";
import { ReferralModel } from "../models/referral.model.js";
import { ReferralMilestoneModel } from "../models/referralMilestone.model.js";
import { ReferralMilestoneAchievementModel } from "../models/referralMilestoneAchievement.model.js";
import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

type CreateReferralInput = {
    referralCode: string;
    referredUserId: string;
};

type GetMyReferralsInput = {
    userId: string;
    page: number;
    limit: number;
};

export const createReferral = async ({ referralCode, referredUserId }: CreateReferralInput) => {
    const referrer = await UserModel.findOne({ referralCode: referralCode.trim().toUpperCase() });

    if (!referrer) {
        throw new ApiError(404, "INVALID_REFERRAL_CODE", "Invalid referral code");
    }

    if (referrer._id.toString() === referredUserId) {
        throw new ApiError(400, "SELF_REFERRAL_NOT_ALLOWED", "You cannot refer yourself");
    }

    const existingReferral = await ReferralModel.findOne({ referredUserId });

    if (existingReferral) {
        throw new ApiError(409, "REFERRAL_ALREADY_EXISTS", "User already has a referral");
    }

    const referral = await ReferralModel.create({
        referrerId: referrer._id,
        referredUserId,
        referralCode: referrer.referralCode,
    });

    return {
        id: referral._id.toString(),
        referrerId: referral.referrerId.toString(),
        referredUserId: referral.referredUserId.toString(),
        referralCode: referral.referralCode,
        status: referral.status,
        createdAt: referral.createdAt,
    };
};

export const getMyReferrals = async ({ userId, page, limit }: GetMyReferralsInput) => {
    const skip = (page - 1) * limit;

    const [referrals, total] = await Promise.all([
        ReferralModel.find({
            referrerId: userId,
        })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        ReferralModel.countDocuments({
            referrerId: userId,
        }),
    ]);

    return {
        referrals: referrals.map((referral) => ({
            id: referral._id.toString(),
            referrerId: referral.referrerId.toString(),
            referredUserId: referral.referredUserId.toString(),
            referralCode: referral.referralCode,
            status: referral.status,
            createdAt: referral.createdAt,
        })),

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
        },
    };
};

export const getMyReferralMilestones = async (userId: string) => {
    const referrals = await ReferralModel.find({ referrerId: userId }).lean();

    const milestones = await ReferralMilestoneModel.find({ status: "ACTIVE" })
        .sort({ requiredAds: 1 })
        .lean();

    const referralProgress = await Promise.all(
        referrals.map(async (referral) => {
            const verifiedAdWatches = await AdWatchEventModel.countDocuments({
                referralId: referral._id,
                status: "VERIFIED",
            });

            const achievements =
                await ReferralMilestoneAchievementModel.find({
                    referralId: referral._id,
                }).lean();

            const achievementMap = new Map(
                achievements.map((achievement) => [
                    achievement.milestoneId.toString(),
                    achievement.status,
                ]),
            );

            return {
                referralId: referral._id.toString(),
                referredUserId: referral.referredUserId.toString(),
                verifiedAdWatches,
                milestones: milestones.map((milestone) => ({
                    milestoneId: milestone._id.toString(),
                    name: milestone.name,
                    requiredAds: milestone.requiredAds,
                    status:
                        achievementMap.get(milestone._id.toString()) ??
                        "PENDING",
                })),
            };
        }),
    );

    return {
        referrals: referralProgress,
    };
};