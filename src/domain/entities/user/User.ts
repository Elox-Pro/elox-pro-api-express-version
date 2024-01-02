export default class User {

    // Model fields
    public readonly id: number = 0;
    public readonly password: string = '';
    public readonly username: string = '';
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly role?: string;
    public readonly email?: string;
    public readonly firstName?: string;
    public readonly lastName?: string;
    public readonly phone?: string;
    public readonly gender?: string;
    public readonly avatarUrl?: string;
    public readonly emailVerified: boolean = false;
    public readonly phoneVerified: boolean = false;
    public readonly secondAuthCodeRequired: boolean = true;
    public readonly secondAuthCodeMethod?: string;
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