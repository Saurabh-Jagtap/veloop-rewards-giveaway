import { Schema, model, type InferSchemaType } from "mongoose";

const giveawaySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["UPCOMING", "ACTIVE", "ENDED", "ARCHIVED"],
      default: "UPCOMING",
    },

    startAt: {
      type: Date,
      required: true,
    },

    endAt: {
      type: Date,
      required: true,
    },

    rules: {
      type: String,
      required: true,
    },

    eligibility: {
      type: String,
      required: true,
    },

    participationSettings: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Giveaway = InferSchemaType<typeof giveawaySchema>;

export const GiveawayModel = model("Giveaway", giveawaySchema);