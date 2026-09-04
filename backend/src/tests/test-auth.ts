import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { UserModel } from "../models/user.model.js";
import { WalletModel } from "../models/wallet.model.js";
import { login, register } from "../services/auth.services.js";

const testAuth = async (): Promise<void> => {
    try {
        await connectDB();

        const email = "auth-test@example.com";

        // Clean up previous test data
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            await WalletModel.deleteOne({
                userId: existingUser._id,
            });

            await UserModel.deleteOne({
                _id: existingUser._id,
            });
        }

        console.log("Testing registration...");

        const result = await register({
            name: "Auth Test User",
            email,
            password: "Password123!",
        });

        console.log("\nRegistration result:");
        console.log({
            user: result.user,
            accessTokenGenerated: Boolean(result.accessToken),
            refreshTokenGenerated: Boolean(result.refreshToken),
        });

        const createdUser = await UserModel.findOne({
            email,
        });

        const createdWallet = createdUser
            ? await WalletModel.findOne({
                  userId: createdUser._id,
              })
            : null;

        console.log("\nDatabase verification:");
        console.log({
            userCreated: Boolean(createdUser),
            walletCreated: Boolean(createdWallet),
        });

        if (!createdUser || !createdWallet) {
            throw new Error("AUTH_TRANSACTION_TEST_FAILED");
        }

        console.log("\n✅ Authentication registration test passed.");

        console.log("\nTesting duplicate registration...");

try {
    await register({
        name: "Another User",
        email: "auth-test@example.com",
        password: "AnotherPassword123!",
    });

    throw new Error("DUPLICATE_REGISTRATION_WAS_ALLOWED");
} catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
        console.log("✅ Duplicate registration correctly rejected.");
    } else {
        throw error;
    }
}


console.log("\nTesting login...");

const loginResult = await login({
    email: "auth-test@example.com",
    password: "Password123!",
});

console.log({
    user: loginResult.user,
    accessTokenGenerated: Boolean(loginResult.accessToken),
    refreshTokenGenerated: Boolean(loginResult.refreshToken),
});

if (
    !loginResult.accessToken ||
    !loginResult.refreshToken
) {
    throw new Error("LOGIN_TOKEN_GENERATION_FAILED");
}

console.log("✅ Login test passed.");


console.log("\nTesting invalid password...");

try {
    await login({
        email: "auth-test@example.com",
        password: "WrongPassword123!",
    });

    throw new Error("INVALID_PASSWORD_WAS_ACCEPTED");
} catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
        console.log("✅ Invalid password correctly rejected.");
    } else {
        throw error;
    }
}
    } catch (error) {
        console.error("\n❌ Authentication registration test failed:");
        console.error(error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }

};

testAuth();