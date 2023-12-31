export type EmailSenderParams = {
    from: string
    to: string
    subject: string
    body?: string
    isHtml?: boolean
    bcc?: []
}

export type EmailNotificationParams = {
    templatePath: string;
    emailSender: IEmailSender;
    templateRenderer: ITemplateRenderer;
    subject: string;
    from: string;
    isHtml: boolean;
};

export interface IEmailSender {
    send(params: EmailSenderParams): Promise<void>
}

export interface IEmailNotification {
    send(to: string, params: Map<string, string>): Promise<void>
}

export interface ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string>
}

export class NodeMailer implements IEmailSender {

    send(params: EmailSenderParams): Promise<void> {
        console.log(params);
        return Promise.resolve();
    }
}

export class EJSTemplateRenderer implements ITemplateRenderer {
    async render(templatePath: string, params: Map<string, string>): Promise<string> {
        return Promise.resolve(JSON.stringify(params));
    }
}

export class EmailNotification implements IEmailNotification {

    private emailSender: IEmailSender;
    private templateRenderer: ITemplateRenderer;
    private templatePath: string;
    private subject: string;
    private from: string;
    private isHtml: boolean;

    constructor(readonly params: EmailNotificationParams) {
        this.emailSender = params.emailSender;
        this.templateRenderer = params.templateRenderer;
        this.templatePath = params.templatePath;
        this.subject = params.subject;
        this.from = params.from;
        this.isHtml = params.isHtml;
    }

    async send(to: string, params: Map<string, string>): Promise<void> {
        const html = await this.templateRenderer.render(this.templatePath, params);
        await this.emailSender.send({
            from: this.from,
            subject: this.subject,
            to: to,
            body: html,
            isHtml: this.isHtml
        });
    }
}