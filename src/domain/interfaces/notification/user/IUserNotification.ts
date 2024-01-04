import User from "domain/entities/user/User";
import INotification from "../INotification";

export default interface IUserNotification extends INotification<User> { }