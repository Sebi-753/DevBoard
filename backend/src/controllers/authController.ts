import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/userModel.js";

import createSendToken from "../utils/createSendToken.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // Check if passwords match
    if (password !== passwordConfirm) {
      return res.status(400).json({
        status: "fail",
        message: "Passwords do not match",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    createSendToken(user._id.toString(), 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // Check password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    // Create and send JWT
    createSendToken(user._id.toString(), 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

// export const protect = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const token = req.cookies.jwt;

//     if (!token) {
//       return res.status(401).json({
//         status: "fail",
//         message: "You are not logged in",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
//       id: string;
//     };

//     const user = await User.findById(decoded.id);

//     if (!user) {
//       return res.status(401).json({
//         status: "fail",
//         message: "The user belonging to this token no longer exists",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return next(new AppError("You are not logged in", 401));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as jwt.JwtPayload & { id: string };

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists", 401),
      );
    }

    // Check if the password was changed after the JWT was issued
    if (user.passwordChangedAt && decoded.iat !== undefined) {
      const changedTimestamp = Math.floor(
        user.passwordChangedAt.getTime() / 1000,
      );

      if (decoded.iat < changedTimestamp) {
        return next(
          new AppError("Password recently changed. Please log in again.", 401),
        );
      }
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo =
  (...roles: ("admin" | "freelancer" | "client")[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to perform this action",
      });
    }
    next();
  };

export const updateMyPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { currentPassword, newPassword, passwordConfirm } = req.body;

    const user = await User.findById(req.user?._id);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!currentPassword || !newPassword || !passwordConfirm) {
      return next(new AppError("Please provide all password fields", 400));
    }

    const correctPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );

    if (!correctPassword) {
      return next(new AppError("Wrong current password", 403));
    }

    if (newPassword.length < 8) {
      return next(
        new AppError("Password must contain at least 8 characters", 400),
      );
    }

    if (newPassword !== passwordConfirm) {
      return next(new AppError("Passwords do not match", 400));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;
    await user.save();

    res.clearCookie("jwt");

    res.status(200).json({
      status: "success",
      message: "Password updated successfully",
    });
  },
);
