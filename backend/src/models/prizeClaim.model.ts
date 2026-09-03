import { Schema, model, type InferSchemaType } from "mongoose";

const prizeClaimSchema = new Schema(
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

        prizeId: {
            type: Schema.Types.ObjectId,
            ref: "Prize",
            required: true,
        },

        winnerId: {
            type: Schema.Types.ObjectId,
            ref: "GiveawayWinner",
            required: true,
        },

        claimData: {
            type: Schema.Types.Mixed,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: [
                "NOT_SUBMITTED",
                "SUBMITTED",
                "PROCESSING",
                "COMPLETED",
                "EXPIRED",
            ],
            default: "NOT_SUBMITTED",
        },

        submittedAt: {
            type: Date,
        },

        processedAt: {
            type: Date,
        },

        completedAt: {
            type: Date,
        },

        expiresAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

prizeClaimSchema.index(
    { winnerId: 1 },
    { unique: true },
);

export type PrizeClaim = InferSchemaType<typeof prizeClaimSchema>;

export const PrizeClaimModel = model("PrizeClaim", prizeClaimSchema);