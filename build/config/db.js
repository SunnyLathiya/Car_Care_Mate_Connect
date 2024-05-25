"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function connects() {
    return (0, mongoose_1.connect)('mongodb://localhost:27017/carcaremateconnect')
        .then(() => {
        console.log("db connected");
    }).catch((error) => {
    });
}
exports.default = connects;
