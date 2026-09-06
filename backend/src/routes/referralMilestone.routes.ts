import { Router } from "express";
import { getReferralMilestonesController } from "../controllers/referralMilestone.controllers.js";

const router = Router();

router.get("/",getReferralMilestonesController);

export default router;