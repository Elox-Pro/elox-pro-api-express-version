export default interface IUserService<T> {
    createUser(user: T): Promise<T>;
    login(user: T): Promise<T>;
    getUsers(): Promise<T[]>;
}