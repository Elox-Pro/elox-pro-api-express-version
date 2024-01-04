import INotificationContainer from "./core/interfaces/INotificationContainer";
import ITemplateRenderer from "./core/interfaces/ITemplateRenderer";
import INotification from "./core/interfaces/INotification";
import EmailParams from "./clients/params/EmailParams";
import EmailClient from "./clients/EmailClient";

class SMSClient implements IUserNotification {

    constructor(private smsParams: SMSParams) { }
    send(to: User, params: Map<string, string>): Promise<void | Error> {
        throw new Error("Method not implemented.");
    }
}

class SMSParams {
    constructor(
        public phoneNumber: string
    ) { }
}

class AuthenticationMethod {
    static readonly EMAIL = "EMAIL";
    static readonly SMS = "SMS";
}

class User {

    // Model fields
    public readonly id: number = 0;
    public readonly createdAt: Date = new Date();
    public readonly updatedAt: Date = new Date();
    public readonly role?: string;
    public readonly username: string = '';
    public readonly email?: string;
    public readonly password: string = '';
    public readonly firstName?: string;
    public readonly lastName?: string;
    public readonly phone?: string;
    public readonly gender?: string;
    public readonly avatarUrl?: string;
    public readonly emailVerified: boolean = false;
    public readonly phoneVerified: boolean = false;
    public readonly secondAuthCodeRequired: boolean = true;
    public readonly secondAuthCodeMethod: string = AuthenticationMethod.EMAIL;
    public readonly lastLoginAt?: Date;

    // Extra fields
    public accessToken?: string;
    public refreshToken?: string;

    constructor(params?: Partial<User>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}

interface IUserNotification extends INotification<User> { }
interface IUserNotificationContainer extends INotificationContainer<User> { }

class TemplateRenderer implements ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string> {
        const strParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
        return Promise.resolve(strParams.join('&'));
    }
}

class CreateNotificationParams {
    constructor(
        public readonly namePrefix: string,
        public readonly notificationType: string,
        public readonly clientParams: EmailParams | SMSParams
    ) { }
}

class NotificationContainer implements IUserNotificationContainer {
    private templateRenderer: TemplateRenderer;
    private container: Map<string, IUserNotification>;
    private EMAIL_FROM: string;

    constructor() {
        this.templateRenderer = new TemplateRenderer();
        this.container = new Map<string, IUserNotification>();
        this.EMAIL_FROM = "<EMAIL>";
    }

    private createUserNotification(params: CreateNotificationParams): IUserNotification {
        try {

            const name = `${params.namePrefix}:${params.notificationType}`;

            if (!this.container.has(name)) {
                switch (params.notificationType) {
                    case AuthenticationMethod.EMAIL:
                        if (!(params.clientParams instanceof EmailParams)) {
                            throw new Error("Invalid params");
                        }
                        this.container.set(name, new EmailClient(params.clientParams));
                        break;
                    case AuthenticationMethod.SMS:
                        if (!(params.clientParams instanceof SMSParams)) {
                            throw new Error("Invalid params");
                        }
                        this.container.set(name, new SMSClient(params.clientParams));
                        break;
                    default:
                        throw new Error();
                }
            }

            return this.container.get(name) as IUserNotification;
        } catch (error) {
            throw error;
        }
    }

    async getSecondAuthCodeNotification(notificationType: string): Promise<IUserNotification> {
        const name = `firstUserNotification:${notificationType}`;

        const emailParams = new EmailParams(
            "./templates/email.ejs",
            this.templateRenderer,
            "Test Email",
            this.EMAIL_FROM,
            true);

        return Promise.resolve(this.createUserNotification(new CreateNotificationParams(name, notificationType, emailParams)));
    }
}

(async function () {
    const notificationContainer = new NotificationContainer();
    const params = new Map<string, string>();
    params.set("code", "123456");
    const userX = new User({
        username: "test",
        email: "<EMAIL>",
        password: "<PASSWORD>",
        secondAuthCodeMethod: AuthenticationMethod.EMAIL,
    });
    let notificationClient = await notificationContainer.getSecondAuthCodeNotification(userX.secondAuthCodeMethod);
    await notificationClient.send(userX, params);
})()