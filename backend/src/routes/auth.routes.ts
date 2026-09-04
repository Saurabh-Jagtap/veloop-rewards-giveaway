import { Router } from "express";
import { loginSchema, registerSchema } from "../validators/auth.validators.js";
import { validate } from "../middlewares/validation.middlewares.js";
import { loginController, registerController } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);

export default router;