import { Request, Response, NextFunction } from "express";
import { sendError } from "../utils/apiResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;

  return sendError(res, err.message, statusCode);
};
