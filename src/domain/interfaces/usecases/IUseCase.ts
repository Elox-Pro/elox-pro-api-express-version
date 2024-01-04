export default interface IUseCase<I, O> {
    execute(params: I | I[]): Promise<O>;
}