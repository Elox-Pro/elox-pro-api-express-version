import { compareSync, genSalt, hash } from "bcryptjs";
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";

export default class EncryptUtils implements IEncryptUtils {
    async hashPassword(password: string): Promise<string> {
        try {
            const saltRounds = 10;
            const salt = await genSalt(saltRounds);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        } catch (error) {
            throw error;
        }
    }

    isPasswordMatched(password: string, hashedPassword: string): Promise<boolean> {
        try {
            return Promise.resolve(compareSync(password, hashedPassword));
        } catch (error) {
            throw error;
        }
    }
}