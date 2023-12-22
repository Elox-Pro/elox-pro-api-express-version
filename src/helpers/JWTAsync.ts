import { JwtPayload, SignOptions, sign, verify, VerifyOptions } from 'jsonwebtoken';

/**
 * Class for handling JWT operations asynchronously, with enhanced error handling,
 * algorithm flexibility, and type safety.
 * 
 * @author Yonatan A Quintero R
 * @date 2023-12-22
 *
 * @template T - The type of the payload to be used in JWTs.
 */
export class JwtAsync<T extends JwtPayload> {

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
    public signAsync(payload: T): Promise<string> {

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
    public verifyAsync(token: string): Promise<T> {

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

                return resolve(payload as T);

            });
        });
    }
}

/**
 * Custom error class for JWT-related errors.
 */
export class JwtError extends Error {
    public originalError: Error | undefined;
    constructor(message: string, originalError?: Error) {
        super(message);
        this.originalError = originalError;
    }
}

/**
 * Interface for user-specific payload data to be included in JWTs.
 * Extends the JwtPayload interface to add user properties.
 */
export interface IJwtUserPayload extends JwtPayload {
    userId: number;
}