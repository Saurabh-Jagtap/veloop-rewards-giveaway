import { Schema, model, type InferSchemaType } from "mongoose";

const giveawayParticipationSchema = new Schema(
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

        transactionId: {
            type: Schema.Types.ObjectId,
            ref: "GiveawayEntryTransaction",
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

        deviceHash: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: ["ACTIVE", "CANCELLED"],
            default: "ACTIVE",
        },

        joinedAt: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    },
);

giveawayParticipationSchema.index(
    { userId: 1, giveawayId: 1 },
    { unique: true },
);

export type GiveawayParticipation = InferSchemaType<typeof giveawayParticipationSchema>;

export const GiveawayParticipationModel = model("GiveawayParticipation", giveawayParticipationSchema);