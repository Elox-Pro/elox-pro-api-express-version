import { RedisClientType } from "redis"
import config from "../config"
import ICodeGenerator from "./ICodeGenerator";

export default class CodeGenerator implements ICodeGenerator {

    private issuer: string = config.APP_NAME;
    private redisClient?: RedisClientType;

    setRedisClient(redisClient: RedisClientType) {
        this.redisClient = redisClient;
    }

    setIssuer(issuer: string) {
        this.issuer = issuer;
    }

    async generate(type: string, aud: string, expiredIn: number): Promise<number> {
        try {
            const code = Math.floor(Math.random() * 899999 + 100000);

            if (this.redisClient) {
                const key = `${this.issuer}:${type}:${aud}`;
                await this.redisClient.set(key, code, { EX: expiredIn });
            }

            return code;
        } catch (error) {
            console.error("Error trying to generate code: ", error);
            throw error;
        }
    }
}