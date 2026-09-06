import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { createAdWatchSchema, getMyAdWatchesSchema } from "../validators/adwatch.validators.js";
import { createAdWatchController, getMyAdWatchesController } from "../controllers/adWatch.controllers.js";

const router = Router();

router.post("/", authMiddleware, validate(createAdWatchSchema), createAdWatchController);
router.get("/me", authMiddleware, validate(getMyAdWatchesSchema, "query"), getMyAdWatchesController);

export default router;