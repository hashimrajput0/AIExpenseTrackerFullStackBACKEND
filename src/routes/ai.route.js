import express from "express"
import { getAISummaryController } from "../controllers/ai.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/insights", authMiddleware, getAISummaryController)

export default router