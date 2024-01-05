export default class CreateUserParams {
    constructor(
        public readonly username: string,
        public readonly email: string,
        public readonly password1: string,
        public readonly password2: string,
        public readonly secondAuthMethod: string,
        public readonly role: string,
        public readonly emailVerified: boolean,
    ) { }
}