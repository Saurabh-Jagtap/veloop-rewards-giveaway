import express from 'express'
import type { Application } from "express";
import cors from 'cors'
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app: Application = express()

app.use(helmet())
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true
}))
app.use(express.json({limit: '1mb'}))

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
})

app.use('/api', apiLimiter)

app.get('/health', (_req, res) => res.status(200).json({success: true, message: "Server is healthy!" }))

app.use(errorMiddleware);

export default app