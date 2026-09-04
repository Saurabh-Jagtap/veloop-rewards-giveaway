import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/password.js";
import { generateReferralCode } from "../utils/referralCode.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { UserModel } from "../models/user.model.js";
import { WalletModel } from "../models/wallet.model.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validators.js";
import { ApiError } from "../utils/ApiError.js";

export const register = async ({ name, email, password }: RegisterInput) => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await UserModel.findOne({
        email: normalizedEmail,
    });

    if (existingUser) {
        throw new ApiError(409, "EMAIL_ALREADY_EXISTS", "Email already exists");
    }

    const passwordHash = await hashPassword(password);

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        let referralCode = generateReferralCode();

        const createUser = async () => {
            while (true) {
                try {
                    const [createdUser] = await UserModel.create(
                        [
                            {
                                name: name.trim(),
                                email: normalizedEmail,
                                password: passwordHash,
                                referralCode,
                            },
                        ],
                        { session },
                    );

                    if (!createdUser) {
                        throw new Error("USER_CREATION_FAILED");
                    }

                    return createdUser;
                } catch (error: any) {
                    if (error?.code !== 11000) {
                        throw error;
                    }

                    const duplicateKey = error?.keyPattern;

                    if (duplicateKey?.referralCode) {
                        referralCode = generateReferralCode();
                        continue;
                    }

                    if (duplicateKey?.email) {
                        throw new Error("EMAIL_ALREADY_EXISTS");
                    }

                    throw error;
                }
            }
        };

        const user = await createUser();

        await WalletModel.create(
            [
                {
                    userId: user._id,
                },
            ],
            { session },
        );

        await session.commitTransaction();

        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        return {
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                referralCode: user.referralCode,
            },
            accessToken,
            refreshToken,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
};

export const login = async ({ email, password }: LoginInput) => {
    const normalizedEmail = email.trim().toLowerCase();

    const user = await UserModel.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
        user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            referralCode: user.referralCode,
        },
        accessToken,
        refreshToken,
    };
};