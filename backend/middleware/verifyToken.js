import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  // Check if token received
  if (!token) {
    res.status(400).json({ message: "You're not authorized, invalid token" });
    throw new Error("Unauthorized, invalid token");
  }

  // Check if token is valid
  const valid = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(valid);
  req.user = valid;
  next();
};
