import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

export interface IUserPayload extends JwtPayload {
    userId: number;
}

export class JWTWrapper<T> {

    private secret: string;
    private expiresIn: number;
    private issuer: string;

    constructor(secret: string, expiresIn: number, issuer: string) {
        this.secret = secret;
        this.expiresIn = parseInt(expiresIn.toString());
        this.issuer = issuer;
    }

    private signAsync(payload: T, audience: string): Promise<string> {
        const options: SignOptions = {
            expiresIn: this.expiresIn,
            issuer: this.issuer,
            audience,
        };

        return new Promise((resolve, reject) => {

            sign(payload as object, this.secret, options, (err, token) => {

                if (err) {
                    return reject(err);
                }

                if (!token) {
                    return reject(new Error('No token generated'));
                }

                resolve(token);

            });
        });
    }

    private verifyAsync(token: string): Promise<T> {
        return new Promise((resolve, reject) => {
            verify(token, this.secret, (err, payload) => {

                if (err) {
                    return reject(err);
                }

                if (!payload) {
                    return reject(new Error('Invalid token'));
                }

                return resolve(payload as T);

            });
        });
    }

    public async sign(payload: T, audience: string): Promise<string> {
        return await this.signAsync(payload, audience);
    }

    public async verify(token: string): Promise<T> {
        return await this.verifyAsync(token);
    }

}
