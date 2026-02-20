import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../utils/AppError";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "7d" },
  );

  // Save refresh token in DB
  // ! IMPORTANT Since password exists in model safe safely save without validation
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  const data = { userId: user._id, role: user.role };

  return { accessToken, refreshToken, data };
};

export const logoutUser = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: "" } });
  /**
   * Alternative approach
   *
   * const user = await User.findById(userId);
   * if(!user) return
   *
   *
   * user.refreshToken = undefined;
   *
   * await user.save({ validateBeforeSave: false });
   *
   */
};
