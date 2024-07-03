import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {errorHandler} from "../middlewares/error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler(400, "Access denied. No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        next(errorHandler(400, "Invalid token"));
    }
};

export const verifyAdmin = async(req, res, next) => {
     try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user || user.userType !== 'admin') {
            return next(errorHandler(400, "Access denied. Only admins are allowed"));
        }
        next();
     }catch(err) {
        next(err);
     }
};

export const verifyCustomer = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user || user.userType !== 'customer') {
            return next(errorHandler(403, 'Access denied'));
        }
        if (!user || user.accountNumber !== parseInt(req.params.accountNumber)) {
            return next(errorHandler(403, 'This is not your account'));
        }
        next();
    } catch (err) {
        next(err);
    }
};

