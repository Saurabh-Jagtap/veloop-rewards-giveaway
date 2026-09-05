import mongoose from "mongoose";
import { env } from "../config/env.js";

try {
    await mongoose.connect(env.MONGO_URI);

    console.log("MONGODB CONNECTION SUCCESS");
    console.log("Database:", mongoose.connection.name);

    await mongoose.disconnect();
} catch (error) {
    console.error("MONGODB CONNECTION FAILED");
    console.error(error);
    process.exit(1);
}