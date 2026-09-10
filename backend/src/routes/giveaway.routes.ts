import { Router } from "express";
import { getCurrentGiveawayController, getGiveawayByIdController, getGiveawayWinnersController, getMyGiveawayClaimController, getMyGiveawayStatusController, getPreviousGiveawaysController, getPreviousWinnersController, joinGiveawayController, submitGiveawayClaimController } from "../controllers/giveaway.controllers.js";
import { getPreviousGiveawaysSchema, getPreviousWinnersSchema, giveawayIdParamSchema, submitGiveawayClaimSchema } from "../validators/giveaway.validators.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/current", getCurrentGiveawayController);
router.get("/previous", validate(getPreviousGiveawaysSchema, "query"), getPreviousGiveawaysController);
router.get("/previous/winners", validate(getPreviousWinnersSchema, "query"), getPreviousWinnersController);

router.get("/:giveawayId/myStatus", authMiddleware, validate(giveawayIdParamSchema, "params"), getMyGiveawayStatusController);
router.get("/:giveawayId/myClaim", authMiddleware, validate(giveawayIdParamSchema, "params"), getMyGiveawayClaimController);

router.get("/:giveawayId/winners", validate(giveawayIdParamSchema, "params"), getGiveawayWinnersController);
router.post("/:giveawayId/join", authMiddleware, validate(giveawayIdParamSchema, "params"), joinGiveawayController);
router.get("/:giveawayId", validate(giveawayIdParamSchema, "params"), getGiveawayByIdController);

router.post("/:giveawayId/claim", authMiddleware, validate(giveawayIdParamSchema, "params"), validate(submitGiveawayClaimSchema, "body"), submitGiveawayClaimController);

export default router;