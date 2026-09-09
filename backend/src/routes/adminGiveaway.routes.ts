import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";

import { createGiveawayController, deleteGiveawayController, updateGiveawayController } from "../controllers/adminGiveaway.controllers.js";
import { createGiveawaySchema, updateGiveawaySchema } from "../validators/adminGiveaway.validators.js";
import { giveawayIdParamSchema } from "../validators/giveaway.validators.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validate(createGiveawaySchema), createGiveawayController);
router.patch("/:giveawayId", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), validate(updateGiveawaySchema), updateGiveawayController);
router.delete("/:giveawayId", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), deleteGiveawayController);

export default router;