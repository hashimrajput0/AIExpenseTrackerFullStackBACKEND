import express from "express"
import {RegisterController, LoginController, LogoutController, meController} from "../controllers/auth.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"
const router = express.Router()


router.post("/register", RegisterController)
router.post("/login", LoginController)
router.post("/logout", LogoutController)
router.get("/me", authMiddleware, meController )


export default router