export default interface IBaseRepository<T> {
    create(model: T): Promise<T>;
    createMany(models: T[]): Promise<Number>;
}