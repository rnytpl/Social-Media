import mongoose from "mongoose";
import asyncHandler from "express-async-handler"
mongoose.set('strictQuery', true)

export const dbConnect = asyncHandler(async () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Database connection successfull")
        })
        .catch((error) => {
            console.error("Database connection failed")
        })
})