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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mailSender_1 = __importDefault(require("../../utils/mailSender"));
const profileSchema = new mongoose_1.Schema({
    profilePhoto: {
        type: String,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true,
        minLength: 1,
        maxLength: 70
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{10}$/
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 255,
    },
    zipcode: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{6}$/
    },
    state: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 30
    },
    yourCars: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    favouriteCar: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 100,
    },
    currentPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30,
    },
    newPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30,
    },
    confirmPassword: {
        type: String,
        trim: true,
        minLength: 8,
        maxLength: 30,
    },
});
function sendVerificationMail(email, profilePhoto) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const mailResponse = yield (0, mailSender_1.default)(email, "profile update successfully", `Your profile photo: ${profilePhoto}`);
            console.log(mailResponse);
        }
        catch (error) {
            console.log("error while sending mail");
        }
    });
}
profileSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield sendVerificationMail(this.email, this.profilePhoto);
        next();
    });
});
exports.default = mongoose_1.default.model("Profile", profileSchema);
