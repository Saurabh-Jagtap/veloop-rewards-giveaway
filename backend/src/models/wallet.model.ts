import { Schema, model, type InferSchemaType } from "mongoose";

const walletSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        veBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        sveBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        tokenBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        gemBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        spinBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        xpBalance: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    {
        timestamps: true,
    },
);

export type Wallet = InferSchemaType<typeof walletSchema>;

export const WalletModel = model("Wallet", walletSchema);