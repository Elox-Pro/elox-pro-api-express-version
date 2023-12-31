export default interface IBaseRepository<T> {
    create(model: T): Promise<T>;
}