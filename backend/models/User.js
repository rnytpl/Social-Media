import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default:
        "https://cdn-icons-png.flaticon.com/512/727/727399.png?w=1380&t=st=1679427965~exp=1679428565~hmac=6d6aad79d46d74fb144c10c2378c0fa6e7bbaf69d6edd6600fac186ff6a6f95d",
    },
    posts: {
      type: Array,
      default: [],
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
