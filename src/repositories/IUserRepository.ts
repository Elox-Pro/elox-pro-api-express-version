export default interface IUserRepository<T> {
    create(user: T): Promise<T>;
    findMany(): Promise<T[]>;
}