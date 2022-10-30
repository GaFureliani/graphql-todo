"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
const environment = () => ({
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET
});
exports.environment = environment;
