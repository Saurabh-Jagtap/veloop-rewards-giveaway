import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";

import { createPrizeController } from "../controllers/adminPrize.controllers.js";
import { createPrizeSchema } from "../validators/adminPrize.validators.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validate(createPrizeSchema), createPrizeController);

export default router;