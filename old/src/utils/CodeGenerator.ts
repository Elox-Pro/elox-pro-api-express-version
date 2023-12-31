import { RedisClientType } from "redis";
import ICodeGenerator from "./ICodeGenerator";

export default class CodeGenerator implements ICodeGenerator {

    private issuer: string;
    private redisClient: RedisClientType;

    constructor(issuer: string, redisClient: RedisClientType) {
        this.issuer = issuer;
        this.redisClient = redisClient;
    }

    async generate(type: string, aud: string, expiresIn: number): Promise<number> {
        try {
            const code = Math.floor(Math.random() * 899999 + 100000);
            const key = `${this.issuer}:${type}:${aud}`;
            await this.redisClient.set(key, code, { EX: expiresIn });
            return code;
        } catch (error) {
            console.error("Error trying to generate code: ", error);
            throw error;
        }
    }
}