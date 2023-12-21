import { JwtPayload } from 'jsonwebtoken';
import JWTAsync from './JWTAsync';

export interface IUserPayload extends JwtPayload {
    userId: number;
}

export class JWTUser<T extends IUserPayload> extends JWTAsync<T> {

    public async sign(payload: T, audience: string): Promise<string> {
        try {
            return await this.signAsync(payload, audience);
        } catch (error) {
            throw error;
        }
    }

    public async verify(token: string): Promise<T> {
        try {
            return await this.verifyAsync(token);
        } catch (error) {
            throw error;
        }
    }
}