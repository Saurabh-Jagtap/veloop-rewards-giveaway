import { Schema, model, type InferSchemaType } from "mongoose";

const giveawayEntryTransactionSchema = new Schema(
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
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        currency: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0,
        },

        type: {
            type: String,
            required: true,
            enum: ["ENTRY_FEE"],
        },

        status: {
            type: String,
            required: true,
            enum: ["PENDING", "SUCCESS", "FAILED", "REVERSED"],
            default: "PENDING",
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
    },
    {
        timestamps: true,
    },
);

export type GiveawayEntryTransaction = InferSchemaType<typeof giveawayEntryTransactionSchema>;

export const GiveawayEntryTransactionModel = model("GiveawayEntryTransaction", giveawayEntryTransactionSchema);