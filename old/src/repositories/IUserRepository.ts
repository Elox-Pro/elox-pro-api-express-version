export default interface IUserRepository<T> {
    findUniqueByUsername(username: string): Promise<T | null>;
    create(user: T): Promise<T>;
    findMany(): Promise<T[]>;
}