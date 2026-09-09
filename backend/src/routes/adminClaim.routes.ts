import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { completePrizeClaimController, processPrizeClaimController } from "../controllers/adminClaim.controllers.js";
import { claimIdParamSchema } from "../validators/adminClaim.validators.js";

const router = Router();

router.post("/:claimId/process", authMiddleware, adminMiddleware, validate(claimIdParamSchema, "params"), processPrizeClaimController);
router.post("/:claimId/complete",authMiddleware,adminMiddleware,validate(claimIdParamSchema, "params"),completePrizeClaimController);

export default router;