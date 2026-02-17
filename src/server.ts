import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";
import authRoutes from "./modules/auth/auth.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errors.middleware";

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
