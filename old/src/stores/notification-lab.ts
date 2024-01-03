class User {
    constructor(
        public id: number,
        public username: string,
        public phoneNumber: string,
        public email: string,
        public slackId: string,
        public notificationType: string,
    ) { }
}

export interface INotification {
    send(to: User, params: Map<string, string>): Promise<void>
}

class EmailClient implements INotification {
    send(to: User, params: Map<string, string>): Promise<void> {
        console.log("notification sent to: " + to.email, params);
        return Promise.resolve();
    }
}

class SMSClient implements INotification {
    send(to: User, params: Map<string, string>): Promise<void> {
        console.log("notification sent to: " + to.phoneNumber, params);
        return Promise.resolve();
    }
}

class SlackClient implements INotification {
    send(to: User, params: Map<string, string>): Promise<void> {
        console.log("notification sent to: " + to.slackId, params);
        return Promise.resolve();
    }
}

class NotificationType {
    public static EMAIL = "EMAIL";
    public static SMS = "SMS";
    public static SLACK = "SLACK";
}

interface INotificationHandler {
    useSecondAuthCodeNotification(): Promise<INotification>;
    useResetPasswordNotification(): Promise<INotification>;
}

class EmailHandler implements INotificationHandler {

    constructor(
        private secondAuthCodeNotification: INotification,
        private resetPasswordNotification: INotification) {
    }
    async useSecondAuthCodeNotification(): Promise<INotification> {
        console.log("Send secondAuthCodeNotification by email");
        return Promise.resolve(this.secondAuthCodeNotification);
    }
    useResetPasswordNotification(): Promise<INotification> {
        console.log("Send useResetPasswordNotification by email");
        return Promise.resolve(this.resetPasswordNotification);
    }
}

class SMSHandler implements INotificationHandler {
    constructor(
        private secondAuthCodeNotification: INotification,
        private resetPasswordNotification: INotification) {
    }
    async useSecondAuthCodeNotification(): Promise<INotification> {
        console.log("Send secondAuthCodeNotification by SMS");
        return Promise.resolve(this.secondAuthCodeNotification);
    }
    useResetPasswordNotification(): Promise<INotification> {
        console.log("Send useResetPasswordNotification by SMS");
        return Promise.resolve(this.resetPasswordNotification);
    }
}

class SlackHandler implements INotificationHandler {
    constructor(
        private secondAuthCodeNotification: INotification,
        private resetPasswordNotification: INotification) {
    }

    async useSecondAuthCodeNotification(): Promise<INotification> {
        console.log("Send secondAuthCodeNotification by Slack");
        return Promise.resolve(this.secondAuthCodeNotification);
    }

    async useResetPasswordNotification(): Promise<INotification> {
        console.log("Send useResetPasswordNotification by Slack");
        return Promise.resolve(this.resetPasswordNotification);
    }
}

class NotificationStore {

    private instances = new Map<string, INotificationHandler>();

    constructor(
        emailHandler: EmailHandler,
        smsHandler: SMSHandler,
        slackHandler: SlackHandler
    ) {
        this.instances.set(NotificationType.EMAIL, emailHandler);
        this.instances.set(NotificationType.SMS, smsHandler);
        this.instances.set(NotificationType.SLACK, slackHandler);
    }

    public get(type: string): INotificationHandler {
        const instance = this.instances.get(type);
        if (!instance) {
            throw new Error("Type not found");
        }
        return instance;
    }
}

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

    const params = new Map<string, string>();
    params.set("code", "123456");

    const notificationStore = new NotificationStore(
        emailHandler,
        smsHandler,
        slackHandler
    );
    const user = new User(1,
        "test",
        "123456",
        "<EMAIL>",
        "123456",
        NotificationType.EMAIL);

    const user2 = new User(1,
        "test",
        "123456",
        "<EMAIL>",
        "123456",
        NotificationType.SMS);
    const user3 = new User(1,
        "test",
        "123456",
        "<EMAIL>",
        "123456",
        NotificationType.SLACK);

    const users = [user, user2, user3];

    for (const user of users) {
        const notification = notificationStore.get(user.notificationType);
        const secondAuthCodeNotification = await notification.useSecondAuthCodeNotification();
        secondAuthCodeNotification.send(user, params);
    }

})()