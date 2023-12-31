export default interface ICaseUse<I, O> {
    execute(data: I): Promise<O>;
}