import User from "domain/entities/user/User";
import AuthenticationMethod from "domain/constants/AuthenticationMethod";
import INotificationContainer from "./interfaces/INotificationContainer";
import ITemplateRenderer from "./interfaces/ITemplateRenderer";
import INotification from "./interfaces/INotification";
import EmailParams from "./params/EmailParams";
import EmailClient from "./clients/EmailClient";

class TemplateRenderer implements ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string> {
        const strParams = Object.entries(params).map(([key, value]) => `${key}=${value}`)
        return Promise.resolve(strParams.join('&'));
    }
}

class NotificationContainer implements INotificationContainer<User> {
    private templateRenderer: TemplateRenderer;
    private container: Map<string, INotification<User>>;
    private EMAIL_FROM: string;

    constructor() {
        this.templateRenderer = new TemplateRenderer();
        this.container = new Map<string, INotification<User>>();
        this.EMAIL_FROM = "<EMAIL>";
    }

    private createUserNotification(namePrefix: string, notificationType: string, emailParams: EmailParams): INotification<User> {
        try {

            const name = `${namePrefix}:${notificationType}`;

            if (!this.container.has(name)) {
                switch (notificationType) {
                    case AuthenticationMethod.EMAIL:
                        this.container.set(name, new EmailClient(emailParams));
                        break;
                    default:
                        throw new Error();
                }
            }

            return this.container.get(name) as INotification<User>;
        } catch (error) {
            throw error;
        }
    }

    getSecondAuthCodeNotification(notificationType: string): INotification<User> {
        const name = `firstUserNotification:${notificationType}`;

        const emailParams = new EmailParams(
            "./templates/email.ejs",
            this.templateRenderer,
            "Test Email",
            this.EMAIL_FROM,
            true);

        return this.createUserNotification(name, notificationType, emailParams);
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
    let notificationClient = notificationContainer.getSecondAuthCodeNotification(userX.secondAuthCodeMethod);
    await notificationClient.send(userX, params);
})()