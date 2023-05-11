import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { logger } from "./middleware/eventLogger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { dbConnect } from "./mongo/dbConnect.js";
import cors from "cors";
import multer from "multer";
import { storage } from "./storage/firebaseConfig.js";
import { uploadMulter } from "./storage/firebaseConfig.js";

/* FILE STORAGE */

const upload = multer({ storage: multer.memoryStorage() });

/*Routes */
import authRoutes from "./routes/authRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import { register } from "./controllers/authContollers.js";
import { createPost } from "./controllers/postsControllers.js";
import { verifyToken } from "./middleware/verifyToken.js";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

/* CONFIG */
const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;
dbConnect();
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/", express.static(path.join(__dirname, "public")));

app.post("/auth/register", upload.single("picture"), uploadMulter, register);
app.post(
  "/posts/createPost",
  verifyToken,
  upload.single("picture"),
  uploadMulter,
  createPost
);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/posts", postsRoutes);

app.all("/*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "public", "404.html"));
  }
});

app.use(errorHandler);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
