import type { Request, Response, NextFunction } from "express";

import { UserModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { WalletModel } from "../models/wallet.model.js";

export const getCurrentUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await UserModel.findById(req.user.id);

        if (!user) {
            throw new ApiError(404, "USER_NOT_FOUND", "User not found");
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    referralCode: user.referralCode,
                    status: user.status,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

export const getCurrentUserWalletController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wallet = await WalletModel.findOne({ userId: req.user.id });

        if (!wallet) {
            throw new ApiError(404, "WALLET_NOT_FOUND", "Wallet not found");
        }

        res.status(200).json({
            success: true,
            data: {
                wallet: {
                    id: wallet._id.toString(),
                    userId: wallet.userId.toString(),
                    veBalance: wallet.veBalance,
                    sveBalance: wallet.sveBalance,
                    tokenBalance: wallet.tokenBalance,
                    gemBalance: wallet.gemBalance,
                    spinBalance: wallet.spinBalance,
                    xpBalance: wallet.xpBalance,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};