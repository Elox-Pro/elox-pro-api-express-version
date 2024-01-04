export default interface ITemplateRenderer {
    render(templatePath: string, params: Map<string, string>): Promise<string>
}
