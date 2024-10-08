import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.get("/", (req, res) => {
    res.send("Hello World! Your backend is deployed successfully.");
});

//routes import
import userRouter from './routes/customer.routes.js'
// import maidRouter from './routes/maid.routes.js'
// routes declaration
app.use("/api/v1/customer", userRouter)
// app.use("/api/v1/maid", maidRouter)


export { app }