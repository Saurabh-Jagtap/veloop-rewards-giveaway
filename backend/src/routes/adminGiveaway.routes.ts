import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";

import { attachPrizeToGiveawayController, createGiveawayController, deleteGiveawayController, endGiveawayController, getGiveawayParticipantsController, selectGiveawayWinnersController, startGiveawayController, updateGiveawayController, updateGiveawayPrizeController } from "../controllers/adminGiveaway.controllers.js";
import { attachPrizeToGiveawaySchema, createGiveawaySchema, getGiveawayParticipantsSchema, giveawayPrizeIdParamsSchema, updateGiveawayPrizeSchema, updateGiveawaySchema } from "../validators/adminGiveaway.validators.js";
import { giveawayIdParamSchema } from "../validators/giveaway.validators.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validate(createGiveawaySchema), createGiveawayController);

router.patch("/:giveawayId", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), validate(updateGiveawaySchema), updateGiveawayController);
router.delete("/:giveawayId", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), deleteGiveawayController);

router.post("/:giveawayId/start", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), startGiveawayController);
router.post("/:giveawayId/end", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), endGiveawayController);
router.post("/:giveawayId/prizes", authMiddleware, adminMiddleware, validate(giveawayIdParamSchema, "params"), validate(attachPrizeToGiveawaySchema), attachPrizeToGiveawayController);

router.patch("/:giveawayId/prizes/:giveawayPrizeId",authMiddleware,adminMiddleware,validate(giveawayPrizeIdParamsSchema, "params"),validate(updateGiveawayPrizeSchema),updateGiveawayPrizeController);

router.get("/:giveawayId/participants",authMiddleware,adminMiddleware,validate(giveawayIdParamSchema, "params"),validate(getGiveawayParticipantsSchema, "query"),getGiveawayParticipantsController);
router.post("/:giveawayId/selectWinners",authMiddleware,adminMiddleware,validate(giveawayIdParamSchema, "params"), selectGiveawayWinnersController);

export default router;