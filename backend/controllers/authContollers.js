import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import crypto from "crypto"

export const register = asyncHandler(async (req, res) => {

    const { firstName, lastName, password, email, picturePath, friends, location, occupation, viewedProfile, impressions } = req.body

    // Check required fields

    const checkFields = [firstName, lastName, password, email].every(Boolean)

    if (!checkFields) {
        res.status(200).json({ message: "Please fill out required fields" })
        throw new Error("Fill all fields")
    }

    const hashedPassword = await bcrypt.hashSync(password, 10)

    const newUser = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
        email,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile: Math.floor(Math.random() * 100),
        impressions: Math.floor(Math.random() * 60)
    })

    // Check if a new user created

    if (!newUser) {
        res.status(401).json({ message: "User couldn't be created" })
        throw new Error("User creation failed")

    }

    res.status(200).json({ message: `New user created ${newUser.firstName}`, newUser })

})

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please enter a valid email or username." })
        throw new Error("Invalid credentials")
    }

    // Find User by email
    const findUser = await User.findOne({ email }).lean().exec()

    // Check if user is found
    if (!findUser) {
        res.status(400).json({ message: "User not  found" })
        throw new Error("User not found")

    }

    const isMatch = await bcrypt.compare(password, findUser.password, (error, result) => {
        if (error) {
            console.error(error)
            res.status(401).json({ message: "Please enter a valid email or password" })
            throw new Error("Invalid email or password")

        }
    })

    // Create a secret key
    // console.log(crypto.randomBytes(256).toString("base64"))
    let token;
    if (isMatch) {
        return token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET_KEY)
    }

    delete findUser.password
    res.status(200).json({ token, findUser })
})