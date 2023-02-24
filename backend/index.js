import express from "express"
import dotenv from "dotenv"
dotenv.config()
import path from "path"
import { logger } from "./middleware/eventLogger.js"
import { errorHandler } from "./middleware/errorHandler.js"
import { dbConnect } from "./mongo/dbConnect.js"
import cors from "cors"

/*Routes */
import authRoutes from "./routes/authRoutes.js"
import postsRoutes from "./routes/postsRoutes.js"
import usersRoutes from "./routes/usersRoutes.js"

/* CONFIG */
const app = express()
const __dirname = path.resolve()
const PORT = process.env.PORT || 4000
dbConnect()
app.use(cors())
app.use(express.json())
app.use(logger)

app.get("/user", (req, res) => {
    res.send("user endpoint")
})

app.use("/", express.static(path.join(__dirname, "public")))
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/postsRoutes", postsRoutes)

app.all("/*", (req, res) => {
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "public", "404.html"))
    }
})

app.use(errorHandler)

app.listen(PORT, console.log(`Server is running on port ${PORT}`))