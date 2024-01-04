import User from "domain/entities/user/User";
import IUserNotification from "domain/interfaces/notification/user/IUserNotification";

export default class NodeMailer implements IUserNotification {
    send(to: User, params: Map<string, string>): Promise<void | Error> {
        throw new Error("Method not implemented.");
    }
}