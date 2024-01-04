import User from "domain/entities/user/User";
import INotificationStore from "../INotificationStore";
import IUserNotification from "./IUserNotification";

export default interface IUserNotificationStore extends INotificationStore<User> {
    getSecondAuthCodeNotif(notificationType: string): Promise<IUserNotification>;
}