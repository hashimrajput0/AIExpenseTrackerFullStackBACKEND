import express, { json } from "express"
import 'dotenv/config'
import cors from "cors";
import ConnectDB from "./db/db.js"
import authRoutes from "./routes/auth.route.js"
import transactionRoutes from "./routes/transaction.route.js"
import dashboardRoutes from "./routes/dashboard.route.js"
import aiRoutes from "./routes/ai.route.js"




import cookieParser from "cookie-parser";

const app = express()
app.use(cors({   
    origin: "https://aiexpensetracker-anyk.onrender.com", // your React app
    credentials: true,
})); 

ConnectDB()


app.use(json())
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/transaction", transactionRoutes)
app.use("/api/dashboard", dashboardRoutes)
app.use("/api/ai", aiRoutes)





export default app
