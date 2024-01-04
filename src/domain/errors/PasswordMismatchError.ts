export default class PasswordMismatchError extends Error {
    constructor() {
        super(`Passwords do not match`);
    }
}