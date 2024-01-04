import EmailParams from "./EmailParams";

export default class NotificationParams {
    constructor(
        public readonly namePrefix: string,
        public readonly notificationType: string,
        public readonly clientParams: EmailParams | any
    ) { }
}