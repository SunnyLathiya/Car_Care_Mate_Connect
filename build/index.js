"use strict";
// const express = require("express");
// const cors = require("cors");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const authRoutes_1 = __importDefault(require("./Customer/routes/authRoutes"));
const db_1 = __importDefault(require("./config/db"));
// import fileupload from 'express-fileupload';
// import { cloudinaryConnect } from "./config/cloudinary";
const app = (0, express_1.default)();
app.use(express_1.default.json());
// cloudinaryConnect();
// app.use(
//     fileupload({
//       useTempFiles: true,
//       tempFileDir: "/temp"
//     })
//   );
const PORT = 4000;
// app.use(cors());
app.use('/', authRoutes_1.default);
app.get('/test', (req, res) => {
    res.json({ data: "test page", people: ['a', 'b', 'c'] });
});
(0, db_1.default)();
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT NUMBER ${PORT}`);
});
