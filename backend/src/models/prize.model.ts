import { Schema, model, type InferSchemaType } from "mongoose";

const prizeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    winnerCount: {
      type: Number,
      required: true,
      min: 1,
    },

    type: {
      type: String,
      required: true,
      enum: ["PHYSICAL", "GIFT_CARD", "DIGITAL"],
    },

    claimType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type Prize = InferSchemaType<typeof prizeSchema>;

export const PrizeModel = model("Prize", prizeSchema);