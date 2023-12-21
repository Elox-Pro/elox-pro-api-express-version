import { expect, test } from '@jest/globals';
import { JWTWrapper, IUserPayload } from '../src/helpers/JWTWrapper';

test('should sign a payload and return a token', async () => {
    const payload: IUserPayload = { userId: 123 };
    const audience = 'my-app';
    const jwtWrapper = new JWTWrapper<IUserPayload>('my-secret', 3600, 'my-app');

    const token = await jwtWrapper.sign(payload, audience);

    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(3);
});

test('should verify a valid token and return the payload', async () => {
    const payload: IUserPayload = { userId: 123 };
    const audience = 'my-app';
    const jwtWrapper = new JWTWrapper<IUserPayload>('my-secret', 3600, 'my-app');

    const token = await jwtWrapper.sign(payload, audience);
    const verifiedPayload = await jwtWrapper.verify(token);

    expect(verifiedPayload).toBeDefined();
    expect(verifiedPayload.userId).toBe(payload.userId);
});

test('should throw an error if verifying an invalid token', async () => {
    const token = 'invalid-token';
    const jwtWrapper = new JWTWrapper('my-secret', 3600, 'my-app');

    await expect(jwtWrapper.verify(token)).rejects.toThrow();
});

