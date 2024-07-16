import { errorHandler } from "../middlewares/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {generateAccountNumber} from "../utils/accountNumber.js";



export const signup = async(req, res, next) => {

    const {userName,email, password, ...rest} = req.body;

        let accountNumber;
        let isUnique = false;
      
        // Loop until a unique account number is found
        while (!isUnique) {
          accountNumber = generateAccountNumber();
          const existingUser = await User.findOne({ accountNumber });
          if (!existingUser) {
            isUnique = true;
          }
        }
        
        const ExistingUser = await User.findOne({
            $or : [
                {email : email},
                {userName : userName}
            ]
        });

        if (ExistingUser) {
            if (userName === ExistingUser.userName && email === ExistingUser.email) {
                return next(errorHandler(400,'You have already an account, please login!'));
            }else if (userName === ExistingUser.userName) {
                return next(errorHandler(400, 'username already exists!, choose another one'));
            }else if (email === ExistingUser.email) {
                return next(errorHandler(400,'You have already an account, please login!'));
            }
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            userName,
            email,
            accountNumber,
            balance : 0,
            password : hashedPassword,
            enabletwoFactorAuthentication : false,
            recentPasswordChangedTime: new Date(),
            enableRecomendations : false,
            enableNotifications : false,
            enableDigitalCurrency : false,
            requestedForDelete : false,
            favourites : "",
            ...rest
        });

        try {
            await newUser.save();
            res.status(200).json({message : "Successfully Created Account"});
        }catch(error) {
            next(error);
        }

};

export const signin = async(req, res, next) => {  // email or username
    const {usernameOrEmail, password} = req.body;

    try {

    const validUser = await User.findOne({
        $or : [
            {email : usernameOrEmail},
            {userName : usernameOrEmail}
        ]
    });

    if (!validUser) {
        return next(errorHandler(400, "User not found!"));
    }

    const passwordValid = bcryptjs.compareSync(password, validUser.password);

    if (!passwordValid) {
        return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({id : validUser._id, role : validUser.role}, process.env.JWT_SECRET_KEY);

    const {password : pass, ...rest} = validUser._doc;

    res.status(200)
            .json({user:rest, accessToken: token});
        }catch(err) {
            next(err);
        }
};

export const getUsers = async(req, res, next) => {
    try {
        const { page = 1, limit = 25 } = req.query;
        const users = await User.find().select('-password')
        .limit(parseInt(limit))
        .skip((page - 1) * limit);

        // Get total count of users for pagination info
        const count = await User.countDocuments();

        res.status(200).json({
          success: true,
          total: count,
          page: parseInt(page),
          limit: parseInt(limit),
          data: users
        });
      } catch (error) {
         console.log(error);
      }
};

export const getUserByAccountNumber = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(errorHandler(400, 'Account Number is required'));
    }
    
    try {
        const validUser = await User.findOne({accountNumber : id}).select("-password");

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }
        
        res.status(200).json({
            success: true,
            data : validUser
        })
    }catch(error) {
       next(error);
    }
};

export const updateUser = async(req, res, next) => {
    const modifyUser = req.body;
    const { id } = req.params;
    if (!id) {
        return next(errorHandler(400, 'Account Number is required'));
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { accountNumber: id },
            { $set: modifyUser },
            { new: true, runValidators: true, select: '-password' }
        );

        if (!updatedUser) {
            return next(errorHandler(404, 'User not found'));
        }

        res.status(200).json({
            success: true,
            data: updatedUser
        });
    }catch(err) {
        next(err);
    }
};

export const deleteUser = async(req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(errorHandler(400, 'Account Number is required'));
    }

    try {
        const validUser = await User.findOne({accountNumber : id}).select("-password");

        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

       validUser.requestedForDelete = true;

       const updatedUser = await validUser.save();

        res.status(200).json({
            success : true,
            data : {
                message : "your request to delete account was processed."
            }
        });
    }catch(err) {
        next(err);
    }
};