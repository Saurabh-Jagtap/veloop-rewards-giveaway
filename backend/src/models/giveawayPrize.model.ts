import { Schema, model, type InferSchemaType } from "mongoose";

const giveawayPrizeSchema = new Schema(
    {
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

        entryCurrency: {
            type: String,
            required: true,
        },

        entryAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        position: {
            type: Number,
            required: true,
            min: 1,
        },

        winnerCount: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    {
        timestamps: true,
    },
);

giveawayPrizeSchema.index(
    { giveawayId: 1, prizeId: 1 },
    { unique: true },
);

export type GiveawayPrize = InferSchemaType<typeof giveawayPrizeSchema>;

export const GiveawayPrizeModel = model("GiveawayPrize", giveawayPrizeSchema);