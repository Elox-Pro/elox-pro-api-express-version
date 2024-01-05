import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TInversify } from "domain/types/TInversify";
import User from "domain/entities/user/User";
import AuthenticateUserParams from "domain/entities/user/AuthenticateUserParams";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";
import IUseCase from "domain/interfaces/usecases/IUseCase";
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";
import IRefreshToken from "domain/interfaces/authentication/IRefreshToken";
import IAccessToken from "domain/interfaces/authentication/IAccessToken";
import IAuthenticationCode from "domain/interfaces/authentication/IAuthenticationCode";
import IUserNotificationStore from "domain/interfaces/notification/user/IUserNotificationStore";
import UserNotFoundError from "domain/errors/UserNotFoundError";
import InvalidPasswordError from "domain/errors/InvalidPasswordError";
import RequiredFieldError from "domain/errors/RequiredFieldError";

@injectable()
export default class AuthenticateUserUC implements IUseCase<AuthenticateUserParams, User> {

    constructor
        (
            @inject(TInversify.IUserRepository)
            readonly userRepository: IUserRepository,

            @inject(TInversify.IEncryptUtils)
            readonly encryptUtils: IEncryptUtils,

            @inject(TInversify.IRefreshToken)
            readonly refreshToken: IRefreshToken,

            @inject(TInversify.IRefreshToken)
            readonly accessToken: IAccessToken,

            @inject(TInversify.IAuthenticationCode)
            readonly authenticationCode: IAuthenticationCode,

            @inject(TInversify.IUserNotificationStore)
            readonly notifStore: IUserNotificationStore
        ) { }

    async execute(params: AuthenticateUserParams): Promise<User> {
        try {

            const { username, password } = params;

            const user = await this.userRepository.findUniqueByUsername(username);

            if (!user) {
                throw new UserNotFoundError(username);
            }

            if (!await this.encryptUtils.isPasswordMatched(password, user.password)) {
                throw new InvalidPasswordError(username);
            }

            // If the second authentication is not required create the access token and refresh token and return the user
            if (!user.secondAuthCodeRequired) {
                await this.fillJwtokens(user);
                return user;
            }

            // Else the second authentication code is required then create the code, send the    notification to the user and return the user

            await this.sendSecondCodeAuthNotification(user);
            return user;

        } catch (error) {
            throw error;
        }
    }

    private async sendSecondCodeAuthNotification(user: User) {
        try {

            if (!user.secondAuthCodeMethod) {
                throw new RequiredFieldError("secondAuthCodeMethod");
            }

            const notif = await this.notifStore.getSecondAuthCodeNotif(
                user.secondAuthCodeMethod
            );

            const code = await this.authenticationCode.generate(user.username);
            const notifParams = new Map<string, string>();

            await notif.send(user, notifParams.set('code', String(code)));

        } catch (error) {
            throw error;
        }
    }

    private async fillJwtokens(user: User): Promise<void> {
        try {
            user.refreshToken = await this.refreshToken.signAsync({
                userId: user.id
            });
            user.accessToken = await this.accessToken.signAsync({
                userId: user.id
            });
        } catch (error) {
            throw error;
        }
    }
}