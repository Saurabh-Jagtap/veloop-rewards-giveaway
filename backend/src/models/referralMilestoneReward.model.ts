import { Schema, model, type InferSchemaType } from "mongoose";

const referralMilestoneRewardSchema = new Schema(
    {
        milestoneId: {
            type: Schema.Types.ObjectId,
            ref: "ReferralMilestone",
            required: true,
        },

        rewardType: {
            type: String,
            required: true,
            enum: ["SVE", "TOKENS", "GEMS", "SPINS", "XP"],
        },

        rewardAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    },
);

export type ReferralMilestoneReward = InferSchemaType<typeof referralMilestoneRewardSchema>;

export const ReferralMilestoneRewardModel = model("ReferralMilestoneReward", referralMilestoneRewardSchema);