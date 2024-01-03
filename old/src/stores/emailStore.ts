import DependencyManager from "../helpers/DependencyManager";
import {
    IEmailSender,
    NodeMailer,
    ITemplateRenderer,
    EJSTemplateRenderer,
    IEmailNotification,
    EmailNotification
} from "../helpers/EmailSender";

const EMAIL_FROM = "<EMAIL>";

const manager = new DependencyManager();

function useTemplateRenderer(): ITemplateRenderer {
    return manager.resolve(EJSTemplateRenderer.name, () => {
        return new EJSTemplateRenderer();
    });
}

function useEmailSender(): IEmailSender {
    return manager.resolve(NodeMailer.name, () => {
        return new NodeMailer();
    });
}

export function useSecondCodeAuthEmail(): IEmailNotification {
    return manager.resolve("secondCodeAuthEmail", () => {
        return new EmailNotification({
            templatePath: "./templates/second-auth-code.ejs",
            templateRenderer: useTemplateRenderer(),
            emailSender: useEmailSender(),
            subject: "Second code authentication",
            from: EMAIL_FROM,
            isHtml: true
        });
    });
}

const secondCodeAuthEmail = useSecondCodeAuthEmail();
secondCodeAuthEmail.send("<EMAIL>", new Map<string, string>());