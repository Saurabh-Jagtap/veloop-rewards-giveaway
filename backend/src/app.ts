import express from 'express'
import type { Application } from "express";
import cors from 'cors'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import referralRoutes from "./routes/referral.routes.js";
import adWatchRoutes from "./routes/adWatch.routes.js";
import referralMilestoneRoutes from "./routes/referralMilestone.routes.js";
import rewardRoutes from "./routes/reward.routes.js";
import giveawayRoutes from "./routes/giveaway.routes.js";
import adminGiveawayRoutes from "./routes/adminGiveaway.routes.js";

const app: Application = express()

app.use(helmet())
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
}))
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser());

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

app.use('/api', apiLimiter)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/referrals", referralRoutes);
app.use("/api/adWatches", adWatchRoutes);
app.use("/api/referralMilestones", referralMilestoneRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/giveaways", giveawayRoutes);

app.use("/api/admin/giveaways", adminGiveawayRoutes);

app.get('/health', (_req, res) => res.status(200).json({ success: true, message: "Server is healthy!" }))

app.use(errorMiddleware);

export default app