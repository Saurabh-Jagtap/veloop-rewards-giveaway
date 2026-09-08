import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";

import { createGiveawayController } from "../controllers/adminGiveaway.controllers.js";
import { createGiveawaySchema } from "../validators/adminGiveaway.validators.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validate(createGiveawaySchema), createGiveawayController);

export default router;