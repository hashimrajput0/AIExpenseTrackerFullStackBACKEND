import express from "express"
import { summaryDashboardController, AllSummary } from "../controllers/dashboard.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js"

const router = express.Router()

router.get("/summary", authMiddleware ,summaryDashboardController)
router.get("/all", authMiddleware, AllSummary )

export default router