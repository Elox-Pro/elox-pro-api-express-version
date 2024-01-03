export class User {
    constructor(
        public id: number,
        public username: string,
        public phoneNumber: string,
        public email: string,
        public slackId: string,
        public notificationType: string,
    ) { }
}

interface INotification {
    send(to: User, params: Map<string, string>): Promise<void>
}

// Enums for Notification Types
enum NotificationType {
    EMAIL = "EMAIL",
    SMS = "SMS",
    SLACK = "SLACK",
}

// Abstract class for Notification Clients
abstract class NotificationClient implements INotification {
    abstract send(to: User, params: Map<string, string>): Promise<void>;
}

class EmailClient extends NotificationClient {
    async send(to: User, params: Map<string, string>): Promise<void> {
        console.log(`Notification sent to: ${to.email}`, params);
    }
}

class SMSClient extends NotificationClient {
    async send(to: User, params: Map<string, string>): Promise<void> {
        console.log(`Notification sent to: ${to.phoneNumber}`, params);
    }
}

class SlackClient extends NotificationClient {
    async send(to: User, params: Map<string, string>): Promise<void> {
        console.log(`Notification sent to: ${to.slackId}`, params);
    }
}

interface INotificationHandler {
    useSecondAuthCodeNotification(): Promise<INotification>;
    useResetPasswordNotification(): Promise<INotification>;
}


// Abstract class for Notification Handlers
abstract class NotificationHandler implements INotificationHandler {
    constructor(
        protected secondAuthCodeNotification: INotification,
        protected resetPasswordNotification: INotification
    ) { }

    async useSecondAuthCodeNotification(): Promise<INotification> {
        console.log(`Send secondAuthCodeNotification by ${this.constructor.name}`);
        return Promise.resolve(this.secondAuthCodeNotification);
    }

    async useResetPasswordNotification(): Promise<INotification> {
        console.log(`Send useResetPasswordNotification by ${this.constructor.name}`);
        return Promise.resolve(this.resetPasswordNotification);
    }
}

class EmailHandler extends NotificationHandler {
    // Implement specific logic for EmailHandler if needed
}

class SMSHandler extends NotificationHandler {
    // Implement specific logic for SMSHandler if needed
}

class SlackHandler extends NotificationHandler {
    // Implement specific logic for SlackHandler if needed
}

// Class for creating users
class UserFactory {
    createUser(id: number, username: string, phoneNumber: string, email: string, slackId: string, notificationType: string): User {
        return new User(id, username, phoneNumber, email, slackId, notificationType);
    }
}

// Notification Store using Dependency Injection
class NotificationStore {
    private instances = new Map<string, INotificationHandler>();

    constructor(
        private emailHandler: EmailHandler,
        private smsHandler: SMSHandler,
        private slackHandler: SlackHandler
    ) {
        this.instances.set(NotificationType.EMAIL, emailHandler);
        this.instances.set(NotificationType.SMS, smsHandler);
        this.instances.set(NotificationType.SLACK, slackHandler);
    }

    public get(type: string): INotificationHandler {
        const instance = this.instances.get(type);
        if (!instance) {
            throw new Error(`Notification handler not found for type: ${type}`);
        }
        return instance;
    }
}

// Usage
(async function () {
    const sendSecondAuthCodeEmail = new EmailClient();
    const sendResetPasswordEmail = new EmailClient();
    const sendSecondAuthCodeSMS = new SMSClient();
    const sendResetPasswordSMS = new SMSClient();
    const sendSecondAuthCodeSlack = new SlackClient();
    const sendResetPasswordSlack = new SlackClient();

    const emailHandler = new EmailHandler(sendSecondAuthCodeEmail, sendResetPasswordEmail);
    const smsHandler = new SMSHandler(sendSecondAuthCodeSMS, sendResetPasswordSMS);
    const slackHandler = new SlackHandler(sendSecondAuthCodeSlack, sendResetPasswordSlack);

    const notificationStore = new NotificationStore(emailHandler, smsHandler, slackHandler);

    const userFactory = new UserFactory();
    const user = userFactory.createUser(1, "test", "123456", "<EMAIL>", "123456", NotificationType.SLACK);

    const params = new Map<string, string>();
    params.set("code", "123456");

    const notification = notificationStore.get(user.notificationType);
    const secondAuthCodeNotification = await notification.useSecondAuthCodeNotification();
    await secondAuthCodeNotification.send(user, params);
})();
