import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReferralSchema, getMyReferralsSchema } from "../validators/referral.validators.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { createReferralController, getMyReferralMilestonesController, getMyReferralsController } from "../controllers/referral.controllers.js";

const router = Router();

router.post("/", authMiddleware, validate(createReferralSchema), createReferralController);
router.get("/me", authMiddleware, validate(getMyReferralsSchema, "query"), getMyReferralsController);
router.get("/me/milestones", authMiddleware, getMyReferralMilestonesController);

export default router;