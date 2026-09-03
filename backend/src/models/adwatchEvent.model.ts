import { Schema, model, type InferSchemaType } from "mongoose";

const adWatchEventSchema = new Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

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

        status: {
            type: String,
            required: true,
            enum: ["PENDING", "VERIFIED", "REJECTED"],
            default: "PENDING",
        },

        watchedAt: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

export type AdWatchEvent = InferSchemaType<typeof adWatchEventSchema>;

export const AdWatchEventModel = model("AdWatchEvent", adWatchEventSchema);