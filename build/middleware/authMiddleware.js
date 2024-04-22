"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mechanic = exports.Admin = exports.Customer = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// import customerModel from '../Customer/models/customerModel';
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token || req.body.token || (req.headers.authorization && req.headers.authorization.replace("Bearer", "").trim());
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'token is missing',
            });
        }
        try {
            const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: 'something went wrong while validating the token'
        });
    }
});
exports.auth = auth;
const Customer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.accountType !== "Customer") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route only for Customer only'
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'user role not verify, try again'
        });
    }
});
exports.Customer = Customer;
const Admin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route only for student only'
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'user role not verify, try again'
        });
    }
});
exports.Admin = Admin;
const Mechanic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: 'this is protected route only for Mechanic only'
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'user role not verify, try again'
        });
    }
});
exports.Mechanic = Mechanic;
