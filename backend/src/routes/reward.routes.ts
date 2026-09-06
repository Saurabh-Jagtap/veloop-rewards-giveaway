import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { getMyRewardsSchema } from "../validators/reward.validators.js";
import { getMyRewardsController } from "../controllers/reward.controllers.js";

const router = Router();

router.get("/me",authMiddleware,validate(getMyRewardsSchema, "query"),getMyRewardsController);

export default router;