import INotification from "./INotification";

export default interface INotificationContainer<T> {
    getSecondAuthCodeNotification(notificationType: string): INotification<T>
}