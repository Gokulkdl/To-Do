import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "No authentication token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Note: decode.id not decode._id (based on how you sign the token)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.token = token;
    req.user = user; // full user object accessible as req.user
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(401).json({ error: "Please authenticate" });
  }
};
