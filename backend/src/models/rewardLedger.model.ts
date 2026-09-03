import { Schema, model, type InferSchemaType } from "mongoose";

const rewardLedgerSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

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

        milestoneRewardId: {
            type: Schema.Types.ObjectId,
            ref: "ReferralMilestoneReward",
            required: true,
        },

        rewardType: {
            type: String,
            required: true,
            enum: ["SVE", "TOKENS", "GEMS", "SPINS", "XP"],
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        referenceId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        balanceBefore: {
            type: Number,
            required: true,
            min: 0,
        },

        balanceAfter: {
            type: Number,
            required: true,
            min: 0,
        },

        status: {
            type: String,
            required: true,
            enum: ["PENDING", "SUCCESS", "FAILED", "REVERSED"],
            default: "PENDING",
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export type RewardLedger = InferSchemaType<typeof rewardLedgerSchema>;

export const RewardLedgerModel = model("RewardLedger", rewardLedgerSchema);