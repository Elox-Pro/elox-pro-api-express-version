export default interface INotification<T> {
    send(to: T, params: Map<string, string>): Promise<void | Error>;
}