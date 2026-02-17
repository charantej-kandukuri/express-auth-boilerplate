import { Request, Response } from "express";
import { registerUser, loginUser, logoutUser } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendSuccess } from "../../utils/apiResponse";
import { AppError } from "../../utils/AppError";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";

export const me = async (req: Request, res: Response) => {
  res.json({
    message: "You are authentiated",
    user: req.user,
  });
};

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await registerUser(name, email, password);

  sendSuccess(res, "User registered successfully", user, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { accessToken, refreshToken } = await loginUser(email, password);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, "Login Successful");
});

export const logout = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (userId) {
    await logoutUser(userId);
  }

  // clear cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  sendSuccess(res, "Logged out successfully");
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError("No refresh token provided", 400);
  }

  const decoded = jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET as string,
  ) as {
    userId: string;
  };

  const user = await User.findById(decoded.userId).select("+refreshToken");

  if (!user || user.refreshToken !== refreshToken) {
    throw new AppError("Invalid refresh token", 401);
  }

  // create new accessToken
  const accessToken = jwt.sign(
    { userId: decoded.userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 15 * 60 * 1000,
  });

  const newRefreshToken = jwt.sign(
    { userId: decoded.userId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );

  // Update refresh token in DB
  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendSuccess(res, "Access Token refreshed");
};
