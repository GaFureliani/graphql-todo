"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.prisma = void 0;
const client_1 = require("@prisma/client");
const verify_token_1 = require("src/helpers/verify-token");
exports.prisma = new client_1.PrismaClient();
const context = ({ req }) => {
    const token = req && req.headers.authorization
        ? (0, verify_token_1.verify_access_token)(req.headers.authorization.replace("Bearer ", ""))
        : null;
    const user_id = token === null || token === void 0 ? void 0 : token.user_id;
    return {
        prisma: exports.prisma,
        user_id
    };
};
exports.context = context;
