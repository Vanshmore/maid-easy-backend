import { Router } from "express";
import { registerMaid } from "../controllers/maid.controller.js";
import { verifyPhone } from "../middlewares/maidVerification.js";
const router = Router()


// router.route("/registerMaid").post(registerMaid)
router.post('/registerMaid', verifyPhone, registerMaid);

export default router