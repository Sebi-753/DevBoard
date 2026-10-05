import type { Response } from "express";
import signToken from "./signToken.js";

const createSendToken = (userId: string, statusCode: number, res: Response) => {
  const token = signToken(userId);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

export default createSendToken;
