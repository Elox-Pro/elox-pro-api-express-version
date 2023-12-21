import { genSalt, hash } from "bcryptjs";
export async function hashPassword(password: string): Promise<string> {
    try {
        const saltRounds = 10;
        const salt = await genSalt(saltRounds);
        const hashedPassword = await hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}