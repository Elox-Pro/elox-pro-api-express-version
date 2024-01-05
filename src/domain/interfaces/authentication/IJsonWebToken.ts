export default interface IJsonWebToken<T> {
    signAsync(payload: T): Promise<string>;
    verifyAsync(token: string): Promise<T>;
}