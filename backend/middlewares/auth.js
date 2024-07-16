import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import CustomError from "../utils/customError.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  try {
    if (!token) {
      throw new CustomError(401, "Access denied. No token provided");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    next(new CustomError(401, "Invalid token"));
  }
};

export const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.userType !== "admin") {
      throw new CustomError(403, "Access denied. Only admins are allowed");
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const verifyCustomer = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.userType !== "customer") {
      throw new CustomError(403, "Access denied");
    }
    if (!user || user.accountNumber !== parseInt(req.params.accountNumber)) {
      throw new CustomError(403, "This is not your account");
    }
    next();
  } catch (err) {
    next(err);
  }
};
