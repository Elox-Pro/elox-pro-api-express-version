export default interface IJwtoken<T> {
    signAsync(payload: T): Promise<string>;
    verifyAsync(token: string): Promise<T>;
}