import { Router } from "express";
import { getCurrentGiveawayController, getGiveawayByIdController, getMyGiveawayStatusController, getPreviousGiveawaysController } from "../controllers/giveaway.controllers.js";
import { getPreviousGiveawaysSchema, giveawayIdParamSchema } from "../validators/giveaway.validators.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/current", getCurrentGiveawayController);
router.get("/previous", validate(getPreviousGiveawaysSchema, "query"), getPreviousGiveawaysController);
router.get("/:giveawayId/myStatus", authMiddleware, validate(giveawayIdParamSchema, "params"), getMyGiveawayStatusController);
router.get("/:giveawayId", validate(giveawayIdParamSchema, "params"), getGiveawayByIdController);

export default router;