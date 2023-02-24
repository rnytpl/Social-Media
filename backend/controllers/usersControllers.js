import asyncHandler from "express-async-handler"
import { User } from "../models/User.js"

export const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().lean().exec()

    // Check users
    if (!users) {
        res.status(401).json({ message: "Users not found" })
        throw new Error("Users not found")
    }

    res.status(200).json(users)

})

export const getUserFriends = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const findUser = await User.findById(id).lean().exec()

    if (!findUser) {
        res.status(401).json({ message: "User not found" })
        throw new Error("User not found")
    }

    try {
        const friends = await Promise.all(
            findUser.friends.map(id => User.findById(id)))

        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )

        res.status(200).json(formattedFriends)

    } catch (error) {
        res.status(404).json({ message: "User friends failed" })
        throw new Error("User friends not found")
    }
})


export const addRemoveFriend = asyncHandler(async (req, res) => {
    const { id, friendId } = req.params;

    const findUser = await User.findById(id);

    if (!findUser) {
        res.status(401).json({ message: "User not found" })
        throw new Error("User not found, addRemoveFriend",)
    }

    const findFriend = await User.findById(id)

    if (!findFriend) {
        res.status(401).json({ message: "Friend not found" })
        throw new Error("Friend not found, addRemoveFriend",)
    }
    try {
        if (findUser.friends.includes(friendId)) {
            findUser.friends = findUser.friends.filter(id => id !== friendId)
        } else {
            findUser.friends.push(friendId)
            findFriend.friends.push(id)
        }

        await findUser.save()
        await findFriend.save()

        const friends = await Promise.all(
            findUser.friends.map(id => User.findById(id))
        )

        const formattedFriends = friends.mapI(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        })

        res.status(200).json(formattedFriends)

    } catch (error) {
        console.error(error)
        res.status(401).json({ message: "Adding/removing user failed" })
        throw new Error(error.message)
    }

})
