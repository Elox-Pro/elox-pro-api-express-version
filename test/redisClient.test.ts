import { expect, describe, it } from '@jest/globals';
import redisClient from '../src/helpers/redisClient';

describe('Redis client', () => {

    const key = 'ts-test-my-key';

    afterAll(async () => {
        if (redisClient.isOpen) {
            const result = await redisClient.get(key);
            if (result) {
                redisClient.del(key);
            }
            await redisClient.quit();
        }
    })

    it('should set a redis key', async () => {

        const value = "123";
        await redisClient.set(key, value);
        const result = await redisClient.get(key);
        expect(result).toBe(value);

    });
});


