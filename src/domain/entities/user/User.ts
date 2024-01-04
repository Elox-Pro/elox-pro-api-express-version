import NotificationType from "domain/constants/NotificationType";

export default class User {

    // Model fields
    public readonly id: number = 0;
    public readonly createdAt: Date = new Date();
    public readonly updatedAt: Date = new Date();
    public readonly role?: string;
    public readonly username: string = '';
    public readonly email?: string;
    public readonly password: string = '';
    public readonly firstName?: string;
    public readonly lastName?: string;
    public readonly phone?: string;
    public readonly gender?: string;
    public readonly avatarUrl?: string;
    public readonly emailVerified: boolean = false;
    public readonly phoneVerified: boolean = false;
    public readonly secondAuthCodeRequired: boolean = true;
    public readonly secondAuthCodeMethod: string = NotificationType.EMAIL;
    public readonly lastLoginAt?: Date;

    // Extra fields
    public accessToken?: string;
    public refreshToken?: string;

    constructor(params?: Partial<User>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}