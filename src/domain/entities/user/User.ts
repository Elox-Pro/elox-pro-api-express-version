import NotificationType from "domain/constants/NotificationType";

export default class User {

    // Model fields
    public readonly id: number = 0;
    public readonly createdAt: Date = new Date();
    public readonly updatedAt: Date = new Date();
    public readonly role: string = '';
    public readonly username: string = '';
    public readonly email: string = '';
    public readonly password: string = '';
    public readonly firstName: string | null = null;
    public readonly lastName: string | null = null;
    public readonly phone: string | null = null;
    public readonly gender: string | null = null;
    public readonly avatarUrl: string | null = null;
    public readonly emailVerified: boolean = false;
    public readonly phoneVerified: boolean = false;
    public readonly secondAuthCodeRequired: boolean = true;
    public readonly secondAuthCodeMethod: string | null = null;
    public readonly lastLoginAt: Date | null = null;

    // Extra fields
    public accessToken?: string;
    public refreshToken?: string;

    constructor(params?: Partial<User>) {
        if (params) {
            Object.assign(this, params);
        }
    }
}