import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;

  try {
    if (!token) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
      role: "user" | "admin";
    };

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token.",
      error,
    });
  }
};
