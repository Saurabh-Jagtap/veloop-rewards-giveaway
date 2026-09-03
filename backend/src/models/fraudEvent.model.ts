import { Schema, model, type InferSchemaType } from "mongoose";

const fraudEventSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        giveawayId: {
            type: Schema.Types.ObjectId,
            ref: "Giveaway",
            required: true,
        },

        referralId: {
            type: Schema.Types.ObjectId,
            ref: "Referral",
        },

        deviceHash: {
            type: String,
            required: true,
        },

        riskScore: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        signals: {
            type: [String],
            required: true,
            default: [],
        },

        action: {
            type: String,
            required: true,
            enum: ["ALLOW", "FLAG", "BLOCK"],
        },
    },
    {
        timestamps: true,
    },
);

export type FraudEvent = InferSchemaType<typeof fraudEventSchema>;

export const FraudEventModel = model("FraudEvent", fraudEventSchema);