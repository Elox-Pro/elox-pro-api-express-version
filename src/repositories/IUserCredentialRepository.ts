export default interface IUserCredentialRepository<T> {
    findUniqueByUsername(username: string): Promise<T | null>;
}