"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const router = express_1.default.Router();
// For handling GET requests
router.get("/allAccess", (req, res) => {
    res.status(200).send("Public Content.");
});
router.get("/customerAccess", authMiddleware_1.auth, authMiddleware_1.Customer, (req, res) => {
    res.status(200).send("Customer Content.");
});
router.post("/sendotp", authController_1.sendOTP);
router.post("/register", authController_1.userSignup);
router.post("/login", authController_1.userSignin);
exports.default = router;
