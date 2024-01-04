import ITemplateRenderer from "domain/interfaces/utils/ITemplateRenderer";

export default class EmailParams {
    constructor(
        public from: string,
        public subject: string,
        public isHtml: boolean,
        public templatePath: string,
        public templateRenderer: ITemplateRenderer,
    ) { }
}