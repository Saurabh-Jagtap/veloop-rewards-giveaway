import { Schema, model, type InferSchemaType } from "mongoose";

const giveawayWinnerSchema = new Schema(
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

        selectionMethod: {
            type: String,
            required: true,
            enum: ["RANDOM"],
        },

        selectedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },

        status: {
            type: String,
            required: true,
            enum: ["SELECTED", "REJECTED"],
            default: "SELECTED",
        },
    },
    {
        timestamps: true,
    },
);

giveawayWinnerSchema.index(
    { giveawayId: 1, prizeId: 1, userId: 1 },
    { unique: true },
);

export type GiveawayWinner = InferSchemaType<typeof giveawayWinnerSchema>;

export const GiveawayWinnerModel = model("GiveawayWinner", giveawayWinnerSchema);