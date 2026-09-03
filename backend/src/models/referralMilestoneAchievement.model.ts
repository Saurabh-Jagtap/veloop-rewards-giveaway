import { Schema, model, type InferSchemaType } from "mongoose";

const referralMilestoneAchievementSchema = new Schema(
    {
        referralId: {
            type: Schema.Types.ObjectId,
            ref: "Referral",
            required: true,
        },

        milestoneId: {
            type: Schema.Types.ObjectId,
            ref: "ReferralMilestone",
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
            default: "PENDING",
        },

        processedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

referralMilestoneAchievementSchema.index(
    { referralId: 1, milestoneId: 1 },
    { unique: true },
);

export type ReferralMilestoneAchievement = InferSchemaType<typeof referralMilestoneAchievementSchema>;

export const ReferralMilestoneAchievementModel = model("ReferralMilestoneAchievement", referralMilestoneAchievementSchema);