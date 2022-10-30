import jwt from 'jsonwebtoken'
import { environment } from './environment';

interface TokenPayload {
    user_id: number
}

export const generate_token = (data: TokenPayload, token_type: "access" | "refresh"): string => {
    const env_vars = environment()
    switch(token_type){
        case 'access':
            return jwt.sign(data, env_vars.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
        case 'refresh':
            return jwt.sign(data, env_vars.REFRESH_TOKEN_SECRET, { expiresIn: '15m' })
    }
}

export const verify_token = (token_string: string, token_type: "access" | "refresh"): TokenPayload => {
    const env_vars = environment()
    switch(token_type){
        case 'access':
            return jwt.verify(token_string, env_vars.ACCESS_TOKEN_SECRET) as TokenPayload
        case 'refresh':
            return jwt.verify(token_string, env_vars.REFRESH_TOKEN_SECRET) as TokenPayload 
    }
}
