import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express'
import { verify_token } from "src/helpers/tokens";

export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient
    user_id?: number
}

export const context = ({ req }: { req: Request }): Context => {
    const token = req && req.headers.authorization?.replace("Bearer ", "");
    return {
        prisma,
        user_id: token ? verify_token(token, 'access').user_id : undefined
    }
}
