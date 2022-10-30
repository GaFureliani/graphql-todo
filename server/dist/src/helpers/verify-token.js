"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_access_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = require("./environment");
const verify_access_token = (token_string) => {
    const env_vars = (0, environment_1.environment)();
    const token = token_string.replace("Bearer ", ""); // 3
    if (!token) {
        throw new Error("No token found");
    }
    return jsonwebtoken_1.default.verify(token, env_vars.ACCESS_TOKEN_SECRET); // 4
};
exports.verify_access_token = verify_access_token;
