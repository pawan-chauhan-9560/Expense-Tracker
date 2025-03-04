import { NextFunction } from "express";
import jwt from "jsonwebtoken";

declare module "express" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = (req: any, res: any, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};