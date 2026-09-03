import { Schema, model, type InferSchemaType } from "mongoose";

const auditLogSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },

        giveawayId: {
            type: Schema.Types.ObjectId,
            ref: "Giveaway",
        },

        referralId: {
            type: Schema.Types.ObjectId,
            ref: "Referral",
        },

        requestId: {
            type: String,
            required: true,
            index: true,
            trim: true,
        },

        action: {
            type: String,
            required: true,
            trim: true,
        },

        amount: {
            type: Number,
            min: 0,
        },

        currency: {
            type: String,
            trim: true,
        },

        result: {
            type: String,
            required: true,
            trim: true,
        },

        securityInfo: {
            type: Schema.Types.Mixed,
        },
    },
    {
        timestamps: true,
    },
);

export type AuditLog = InferSchemaType<typeof auditLogSchema>;

export const AuditLogModel = model("AuditLog", auditLogSchema);