import { SignOptions, sign, verify, VerifyOptions } from 'jsonwebtoken';
import IJwtAsync from './IJwtAsync';
import { TJwtUserPayload } from '../types/appTypes';

/**
 * Class for handling JWT operations asynchronously, with enhanced error handling,
 * and type safety.
 * 
 * @author Yonatan A Quintero R
 * @date 2023-12-22
 *
 * @template T - The type of the payload to be used in JWTs.
 */
export default class JwtUser implements IJwtAsync<TJwtUserPayload> {

    /**
    * The issuer of the JWTs.
    */
    private issuer: string;

    /**
     * The intended audience of the JWTs.
     */
    private audience: string;

    /**
     * The secret key used for signing and verifying JWTs.
     */
    private secret: string;

    /**
     * The expiration time of the JWTs expressed in string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d"
     */
    private expiresIn: string;

    /**
     * Constructs a new JwtAsync instance.
     *
     * @param issuer - The issuer of the JWTs.
     * @param audience - The intended audience of the JWTs.
     * @param secret - The secret key used for signing and verifying JWTs.
     * @param expiresIn - The expiration time of the JWTs.
     */
    constructor(issuer: string, audience: string, secret: string, expiresIn: string) {
        this.issuer = issuer;
        this.audience = audience;
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    /**
     * Signs a payload and generates a JWT token asynchronously.
     *
     * @param payload - The payload to include in the JWT.
     * @returns A Promise that resolves with the generated JWT token, or rejects with an error.
     */
    public signAsync(payload: TJwtUserPayload): Promise<string> {

        const options: SignOptions = {
            issuer: this.issuer,
            audience: this.audience,
            expiresIn: this.expiresIn
        }

        return new Promise((resolve, reject) => {
            sign(payload, this.secret, options, (err, token) => {

                if (err) {
                    return reject(new JwtError('Failed to sign token', err))
                }

                if (!token) {
                    return reject(new JwtError('No token generated'));
                }

                return resolve(token);

            });
        });
    }

    /**
     * Verifies a JWT token and extracts its payload asynchronously.
     *
     * @param token - The JWT token to verify.
     * @returns A Promise that resolves with the verified payload, or rejects with an error.
     */
    public verifyAsync(token: string): Promise<TJwtUserPayload> {

        const options: VerifyOptions = {
            issuer: this.issuer,
            audience: this.audience
        }

        return new Promise((resolve, reject) => {
            verify(token, this.secret, options, (err, payload) => {

                if (err) {
                    return reject(new JwtError('Failed to verify token', err));
                }

                if (!payload) {
                    return reject(new JwtError('Invalid token'));
                }

                return resolve(payload as TJwtUserPayload);

            });
        });
    }
}