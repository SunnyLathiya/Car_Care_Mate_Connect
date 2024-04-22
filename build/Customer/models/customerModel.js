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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const customerSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },
    confirmPassword: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 30,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Customer", "Mechanic"],
        byDefault: "Customer",
        required: true,
    },
    additionalDetails: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Profile",
    },
    profilePhoto: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255,
    },
    token: {
        type: String,
        maxLength: 1000,
    },
    resetPasswordExpires: {
        type: Date,
    },
});
exports.default = mongoose_1.default.model("Customer", customerSchema);
