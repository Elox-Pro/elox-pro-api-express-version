export default interface IEncryptUtils {
    hashPassword(password: string): Promise<string>;
    isPasswordMatched(password: string, hashedPassword: string): Promise<boolean>;
}