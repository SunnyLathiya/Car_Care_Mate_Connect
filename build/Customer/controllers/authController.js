"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignin = exports.userSignup = exports.sendOTP = void 0;
const otpModel_1 = __importDefault(require("../models/otpModel"));
// import otpGenerator from 'otp-generator';
// import otpGenerator from 'otp-generator';
const otpGenerator = __importStar(require("otp-generator"));
const customerModel_1 = __importDefault(require("../models/customerModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const profileModel_1 = __importDefault(require("../models/profileModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import mailSender from '../utils/mailSender';
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // console.log(req.body);
        // console.log(email);
        let checkUserPresent = yield customerModel_1.default.findOne({ email });
        if (checkUserPresent) {
            return res.status(400).json({
                success: false,
                message: "User Already Registered",
            });
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        // console.log(otp);
        let result = yield otpModel_1.default.findOne({ otp: otp });
        // while (result) {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        result = yield otpModel_1.default.findOne({ otp: otp });
        // }
        const otpPayload = { email, otp };
        const otpBody = yield otpModel_1.default.create(otpPayload);
        // console.log("op:", otpBody);
        res.status(200).json({
            success: true,
            message: "OTP send successfully",
            otp,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            message: error.message,
        });
    }
});
exports.sendOTP = sendOTP;
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, confirmpassword, accountType, otp, } = req.body;
        if (!username ||
            !email ||
            !password ||
            !confirmpassword ||
            !otp) {
            return res.status(400).json({
                success: false,
                message: "please add all data",
            });
        }
        if (password !== confirmpassword) {
            return res.status(400).json({
                success: false,
                message: "password and confirm password are not match",
            });
        }
        const existingUser = yield customerModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists",
            });
        }
        const recentOtp = yield otpModel_1.default.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        }
        else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }
        let hashedPassword;
        try {
            hashedPassword = yield bcrypt_1.default.hash(password, 12);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password",
            });
        }
        const profileDetails = yield profileModel_1.default.create({
            phoneNumber: null,
            address: null,
            zipcode: null,
            state: null,
            country: null,
            yourCar: null,
            favouriteCar: null,
        });
        console.log(profileDetails);
        console.log(profileDetails._id);
        const user = yield customerModel_1.default.create({
            username,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username} ${username}`,
        });
        return res.status(200).json({
            success: true,
            message: "user created account successfully",
            user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "user can not be registered, please try again",
        });
    }
});
exports.userSignup = userSignup;
const userSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details carefully",
            });
        }
        let user = yield customerModel_1.default.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered",
            });
        }
        const payload = {
            email: user.email,
            id: user._id,
            username: user.username,
            accountType: user.accountType,
        };
        const sss = "sunny";
        if (yield bcrypt_1.default.compare(password, user.password)) {
            // Password matches
            let token = jsonwebtoken_1.default.sign(payload, sss, {
                expiresIn: "2h",
            });
            user.token = token;
            // user.password = undefined;
            user = user.toObject(); // Convert to plain JavaScript object
            // Create a new object without the password property
            const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user: userWithoutPassword,
                message: "login successfully",
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "password incorrect",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "login failure, please try again",
        });
    }
});
exports.userSignin = userSignin;
