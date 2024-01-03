import ITemplateRenderer from "notification/interfaces/ITemplateRenderer";

export default class EmailParams {
    constructor(
        public templatePath: string,
        public templateRenderer: ITemplateRenderer,
        public subject: string,
        public from: string,
        public isHtml: boolean
    ) { }
}