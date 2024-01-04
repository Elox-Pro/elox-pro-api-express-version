import NotificationParams from "domain/entities/notification/NotificationParams";
import INotification from "./INotification";

export default interface INotificationStore<T> {
    getNotification(params: NotificationParams): Promise<INotification<T>>
}