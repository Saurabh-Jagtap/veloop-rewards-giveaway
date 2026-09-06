import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCurrentUserController, getCurrentUserWalletController, getMyParticipationsController } from "../controllers/user.controllers.js";
import { getMyParticipationsSchema } from "../validators/user.validators.js";
import { validate } from "../middlewares/validation.middlewares.js";


const router = Router();

router.get("/me", authMiddleware, getCurrentUserController);
router.get("/me/wallet", authMiddleware, getCurrentUserWalletController);
router.get("/me/participations",authMiddleware,validate(getMyParticipationsSchema, "query"),getMyParticipationsController);

export default router;