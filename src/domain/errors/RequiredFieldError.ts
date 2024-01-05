export default class FieldRequiredError extends Error {
    constructor(field: string) {
        super(`${field} is required`);
    }
}