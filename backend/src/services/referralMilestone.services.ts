import { ReferralMilestoneModel } from "../models/referralMilestone.model.js";

export const getReferralMilestones = async () => {
    const milestones = await ReferralMilestoneModel.find({ status: "ACTIVE" })
        .sort({ requiredAds: 1 })
        .lean();

    return {
        milestones: milestones.map((milestone) => ({
            id: milestone._id.toString(),
            name: milestone.name,
            requiredAds: milestone.requiredAds,
            status: milestone.status,
        })),
    };
};