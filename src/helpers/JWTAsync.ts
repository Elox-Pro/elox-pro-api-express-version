import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';

interface IJWTParams {
    accessTokenKey: string,
    accessTokenExpiresIn: string,
    refreshTokenKey: string,
    refreshTokenExpiresIn: string
}

export default abstract class JWTAsync<T extends JwtPayload> {

    protected params: IJWTParams;

    constructor(params: IJWTParams) {
        this.params = params;
    }

    protected signAsync(payload: T, audience: string): Promise<string> {
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

    protected verifyAsync(token: string): Promise<T> {
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

    abstract sign(payload: T, audience: string): Promise<string>;

    abstract verify(token: string): Promise<T>;

}
