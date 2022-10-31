import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express'
import { verify_token } from "src/helpers/tokens";
export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient
    user_id?: number
    req: Request
    res: Response
}

interface ContextArgs {
    req: Request
    res: Response
}

export const context = ({ req, res }: ContextArgs): Context => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    return {
        req,
        res,
        prisma,
        user_id: verify_token('access', token)?.user_id
    }
}
