import INotification from "features/notification/core/interfaces/INotification";
import EmailParams from "features/notification/clients/params/EmailParams";

export default class EmailClient<T> implements INotification<T>{

    constructor(private params: EmailParams) {
        console.log(this.params);
    }
    send(to: T, params: Map<string, string>): Promise<void> {
        // const html = this.templateRenderer.render("./templates/email.ejs", params);
        console.log(`Notification sent by email to: ${to}`, params);
        return Promise.resolve();
    }
}
