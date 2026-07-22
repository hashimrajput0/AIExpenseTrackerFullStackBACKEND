import express from "express"
import authMiddleware from "../middlewares/auth.middleware.js"
import { createTransactionController, getTransactionController, updateTransactionController, deleteTransactionController } from "../controllers/transaction.controller.js"

const router = express.Router()

router.post("/create", authMiddleware, createTransactionController)
router.get("/get", authMiddleware, getTransactionController)
router.patch("/update/:id", authMiddleware, updateTransactionController)
router.delete("/delete/:id", authMiddleware, deleteTransactionController)




export default router