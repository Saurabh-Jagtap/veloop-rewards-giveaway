import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getCurrentUserController, getCurrentUserWalletController } from "../controllers/user.controllers.js";


const router = Router();

router.get("/me", authMiddleware, getCurrentUserController);
router.get("/me/wallet", authMiddleware, getCurrentUserWalletController);

export default router;