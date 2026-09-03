import { Schema, model, type InferSchemaType } from "mongoose";

const referralMilestoneSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        requiredAds: {
            type: Number,
            required: true,
            unique: true,
            min: 1,
        },

        status: {
            type: String,
            required: true,
            enum: ["ACTIVE", "INACTIVE"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    },
);

export type ReferralMilestone = InferSchemaType<typeof referralMilestoneSchema>;

export const ReferralMilestoneModel = model("ReferralMilestone", referralMilestoneSchema);