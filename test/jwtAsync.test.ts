import { expect, test } from '@jest/globals';
import JwtUser from '../src/helpers/JwtUser';
import config from '../src/config';
import { TJwtUserPayload } from '../src/types/appTypes';
const {
    JWT_ISSUER,
    JWT_AUDIENCE,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXIPRES_IN,
    JWT_REFRESH_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRES_IN
} = config;

test('should sign a payload and return a token', async () => {
    const payload: TJwtUserPayload = { userId: 123 };
    const accessToken = new JwtUser(
        JWT_ISSUER,
        JWT_AUDIENCE,
        JWT_ACCESS_TOKEN_SECRET,
        JWT_ACCESS_TOKEN_EXIPRES_IN
    );

    const token = await accessToken.signAsync(payload);

    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3);
});

test('should verify a valid token and return the payload', async () => {
    const payload: TJwtUserPayload = { userId: 123 };
    const refreshToken = new JwtUser(
        JWT_ISSUER,
        JWT_AUDIENCE,
        JWT_REFRESH_TOKEN_SECRET,
        JWT_REFRESH_TOKEN_EXPIRES_IN
    );

    const token = await refreshToken.signAsync(payload);
    const verifiedPayload = await refreshToken.verifyAsync(token);

    expect(verifiedPayload).toBeDefined();
    expect(verifiedPayload.userId).toBe(payload.userId);
});

test('should throw an error if verifying an invalid token', async () => {
    const token = 'invalid-token';
    const accessToken = new JwtUser(
        JWT_ISSUER,
        JWT_AUDIENCE,
        JWT_ACCESS_TOKEN_SECRET,
        JWT_ACCESS_TOKEN_EXIPRES_IN
    );

    await expect(accessToken.verifyAsync(token)).rejects.toThrow();
});

