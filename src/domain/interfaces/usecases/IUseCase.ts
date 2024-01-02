export default interface ICaseUse<I, O> {
    execute(params: I): Promise<O>;
}