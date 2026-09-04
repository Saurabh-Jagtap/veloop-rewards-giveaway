import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    referralCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["ACTIVE", "SUSPENDED", "BLOCKED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model("User", userSchema);