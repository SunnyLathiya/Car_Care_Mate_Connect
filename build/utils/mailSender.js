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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// interface MailSenderOptions {
//   host: string;
//   user: string;
//   pass: string;
// }
const mailSender = (email, title, body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(process.env.MAIL_USER, process.env.MAIL_PASS);
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });
        const info = yield transporter.sendMail({
            from: "CarCareMateConnect.",
            to: `${email}`,
            subject: `${title}`,
            text: `${body}`,
        });
        // console.log(info);
        return info;
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.default = mailSender;
