import { errorHandler } from "../middlewares/error.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {generateAccountNumber} from "../utils/accountNumber.js";



export const signup = async(req, res, next) => {
    const {userType,
        fullName, 
        userName,
        email,
        password,
        dateOfBirth,
        profileImage,
        presentAddress,
        permanentAddress,
        city,
        postalCode,
        country,
        currency,
        timeZone,
        enabletwoFactorAuthentication,
        recentPasswordChangedTime,
        enableRecomendations,
        enableNotifications,
        enableDigitalCurrency} = req.body;

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

        if (userType === "" || fullName === "" || userName === "" || email === "" || password === "" || dateOfBirth === "" || profileImage === "" || 
            presentAddress === "" || permanentAddress === "" || city === "" || postalCode === "" || country === "" || currency === "" || timeZone === "" || enabletwoFactorAuthentication === ""
            || enableRecomendations === "" || enableNotifications === "" || enableDigitalCurrency === ""  
         ) {
            return next(errorHandler(400, "All fields are required"));
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
            userType,
            accountNumber,
            balance : 0,
            fullName, 
            userName,
            email,
            password : hashedPassword,
            dateOfBirth,
            profileImage,
            presentAddress,
            permanentAddress,
            city,
            postalCode,
            country,
            currency,
            timeZone,
            enabletwoFactorAuthentication : enabletwoFactorAuthentication || false,
            recentPasswordChangedTime: new Date(),
            enableRecomendations : enableRecomendations || false,
            enableNotifications : enableRecomendations || false,
            enableDigitalCurrency : enableDigitalCurrency || false,
            favourites : ""
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
            .cookie('access_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .json(rest);
        }catch(err) {
            next(err);
        }
};