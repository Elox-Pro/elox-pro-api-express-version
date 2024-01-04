import NotificationParams from "domain/entities/notification/NotificationParams";
import IUserNotification from "domain/interfaces/notification/user/IUserNotification";
import IUserNotificationStore from "domain/interfaces/notification/user/IUserNotificationStore";
export default class UserNotificationStore implements IUserNotificationStore {
    getSecondAuthCodeNotif(notificationType: string): Promise<IUserNotification> {
        throw new Error("Method not implemented.");
    }
    getNotification(params: NotificationParams): Promise<IUserNotification> {
        throw new Error("Method not implemented.");
    }
}