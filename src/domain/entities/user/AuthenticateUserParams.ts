export default class AuthenticateUserParams {
    constructor(
        public readonly username: string,
        public readonly password: string
    ) { }
}