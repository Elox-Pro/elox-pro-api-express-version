export default class User {

    public readonly id: number = 0;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly role?: string;
    public readonly username?: string;
    public readonly email?: string;
    public readonly password?: string;
    public readonly firstName?: string;
    public readonly lastName?: string;
    public readonly phone?: string;
    public readonly gender?: string;
    public readonly avatarUrl?: string;
    public readonly emailVerified: boolean = false;
    public readonly phoneVerified: boolean = false;
    public readonly secondAuthRequired: boolean = true;
    public readonly secondAuthMethod?: string;
    public readonly lastLoginAt?: Date;

    constructor(data?: Partial<User>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}