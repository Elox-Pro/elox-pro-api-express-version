enum NotificationType {
    EMAIL = "EMAIL",
    SMS = "SMS",
    SLACK = "SLACK",
}

class User {
    constructor(
        public id: number,
        public username: string,
        public phoneNumber: string,
        public email: string,
        public slackId: string,
        public notificationType: NotificationType,
    ) { }
}

interface INotification {
    send(to: User, params: Map<string, string>): Promise<void | Error>
}


export interface ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string>
}

class EmailClientParams {
    constructor(
        public templatePath: string,
        public templateRenderer: ITemplateRenderer,
        public subject: string,
        private from: string,
        private isHtml: boolean
    ) { }
}

class EmailClient implements INotification {

    constructor(private ctorParams: EmailClientParams) {
        console.log(this.ctorParams);
    }
    send(to: User, params: Map<string, string>): Promise<void> {
        // const html = this.templateRenderer.render("./templates/email.ejs", params);
        console.log(`Notification sent by email to: ${to.email}`, params);
        return Promise.resolve();
    }
}

class SMSClientParams {
    constructor(private from: string) { }
}

class SMSClient implements INotification {

    constructor(private ctorParams: SMSClientParams) {
        console.log(this.ctorParams);
    }
    send(to: User, params: Map<string, string>): Promise<void> {
        console.log(`Notification sent by sms to: ${to.phoneNumber}`, params);
        return Promise.resolve();
    }
}

class SlackParams {
    constructor(private from: string) { }
}

class SlackClient implements INotification {
    constructor(private ctorParams: SlackParams) {
        console.log(this.ctorParams);
    }
    send(to: User, params: Map<string, string>): Promise<void> {
        console.log(`Notification sent by slack to: ${to.slackId}`, params);
        return Promise.resolve();
    }
}

class TemplateRenderer implements ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string> {
        const strParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
        return Promise.resolve(strParams.join('&'));
    }
}

interface INotificationContainer {
    useFirstUserNotification(notificationType: NotificationType): INotification
    useSecondUserNotification(notificationType: NotificationType): INotification
}

class NotificationContainer implements INotificationContainer {
    private templateRenderer: TemplateRenderer;
    private container: Map<string, INotification>;
    private EMAIL_FROM: string;

    constructor() {
        this.templateRenderer = new TemplateRenderer();
        this.container = new Map<string, INotification>();
        this.EMAIL_FROM = "<EMAIL>";
    }

    private createUserNotification(
        namePrefix: string,
        notificationType: NotificationType,
        emailParams: EmailClientParams,
        smsParams: SMSClientParams,
        slackParams: SlackParams
    ): INotification {

        try {

            const name = `${namePrefix}:${notificationType}`;

            if (!this.container.has(name)) {
                switch (notificationType) {
                    case NotificationType.EMAIL:
                        this.container.set(name, new EmailClient(emailParams));
                        break;
                    case NotificationType.SMS:
                        this.container.set(name, new SMSClient(smsParams));
                        break;
                    case NotificationType.SLACK:
                        this.container.set(name, new SlackClient(slackParams));
                        break;
                    default:
                        throw new Error();
                }
            }

            return this.container.get(name) as INotification;
        } catch (error) {
            throw error;
        }
    }

    useFirstUserNotification(notificationType: NotificationType): INotification {
        const name = `firstUserNotification:${notificationType}`;

        const emailParams = new EmailClientParams(
            "./templates/email.ejs",
            this.templateRenderer,
            "Test Email",
            this.EMAIL_FROM,
            true);

        const smsParams = new SMSClientParams(this.EMAIL_FROM);
        const slackParams = new SlackParams(this.EMAIL_FROM);

        return this.createUserNotification(name, notificationType, emailParams, smsParams, slackParams);
    }

    useSecondUserNotification(notificationType: NotificationType): INotification {
        const name = `secondtUserNotification:${notificationType}`;

        const emailParams = new EmailClientParams(
            "./templates/email-2.ejs",
            this.templateRenderer,
            "Test Email 2",
            this.EMAIL_FROM,
            true);

        const smsParams = new SMSClientParams(this.EMAIL_FROM);
        const slackParams = new SlackParams(this.EMAIL_FROM);

        return this.createUserNotification(name, notificationType, emailParams, smsParams, slackParams);
    }
}

// Implementation
(async function () {
    const notificationContainer = new NotificationContainer();
    const params = new Map<string, string>();
    params.set("code", "123456");
    const userX = new User(1, "test", "123456", "<EMAIL>", "123", NotificationType.SLACK);
    let notificationClient = notificationContainer.useFirstUserNotification(userX.notificationType);
    await notificationClient.send(userX, params);

    userX.notificationType = NotificationType.SMS;
    notificationClient = notificationContainer.useSecondUserNotification(userX.notificationType);
    await notificationClient.send(userX, params);
})()