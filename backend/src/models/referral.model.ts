import { Schema, model, type InferSchemaType } from "mongoose";

const referralSchema = new Schema(
    {
        referrerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        referredUserId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        referralCode: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            required: true,
            enum: ["ACTIVE", "COMPLETED", "BLOCKED"],
            default: "ACTIVE",
        },
    },
    {
        timestamps: true,
    },
);

export type Referral = InferSchemaType<typeof referralSchema>;

export const ReferralModel = model("Referral", referralSchema);