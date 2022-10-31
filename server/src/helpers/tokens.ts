import jwt from 'jsonwebtoken'
import { environment } from './environment';

interface TokenPayload {
    user_id: number
}

export const generate_token = (token_type: "access" | "refresh", data: TokenPayload ): string => {
    const env_vars = environment()
    switch(token_type){
        case 'access':
            return jwt.sign({...data, iat: Date.now() / 1000}, env_vars.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        case 'refresh':
            return jwt.sign({...data, iat: Date.now() / 1000}, env_vars.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    }
}

export const verify_token = (token_type: "access" | "refresh", token_string?: string): TokenPayload | null => {
    if(!token_string) return null
    const env_vars = environment()
    try {
        switch(token_type){
            case 'access':
                return jwt.verify(token_string, env_vars.ACCESS_TOKEN_SECRET) as TokenPayload
            case 'refresh':{
                return jwt.verify(token_string, env_vars.REFRESH_TOKEN_SECRET) as TokenPayload
            }
        }
    } catch {
        return null
    }
}
