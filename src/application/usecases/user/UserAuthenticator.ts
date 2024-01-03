import User from "domain/entities/user/User";
import UserAuthenticatorParams from "domain/entities/user/UserAuthenticatorParams";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";
import IUseCase from "domain/interfaces/usecases/IUseCase";
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";
import IJwtoken from "domain/interfaces/utils/IJwtoken";
import ISecondAuthCode from "domain/interfaces/utils/ISecondAuthCode";
import INotificationContainer from "notification/interfaces/INotificationContainer";
import TJwtUserPayload from "domain/types/TJwtUserPayload";

export default class UserAuthenticator implements IUseCase<UserAuthenticatorParams, User> {

    constructor(
        readonly userRepository: IUserRepository,
        readonly encryptUtils: IEncryptUtils,
        readonly refreshToken: IJwtoken<TJwtUserPayload>,
        readonly accessToken: IJwtoken<TJwtUserPayload>,
        readonly secondAuthCode: ISecondAuthCode,
        readonly notificationContainer: INotificationContainer<User>
    ) { }

    async execute(params: UserAuthenticatorParams): Promise<User> {
        try {

            const { username, password } = params;

            const user = await this.userRepository.findUniqueByUsername(username);

            if (!user) {
                throw new Error('User not found');
            }

            if (!this.encryptUtils.isPasswordMatched(password, user.password)) {
                throw new Error('Passwords do not match');
            }

            // If the second authentication is not required create the access token and refresh token and return the user
            if (!user.secondAuthCodeRequired) {
                this.fillJwtokens(user);
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
            const code = await this.secondAuthCode.generate(user.username);
            const notificationParams = new Map<string, string>();
            notificationParams.set('code', String(code));
            const notification = await this.notificationContainer.getSecondAuthCodeNotification(user.secondAuthCodeMethod);
            await notification.send(user, notificationParams);
        } catch (error) {
            throw error;
        }
    }

    private async fillJwtokens(user: User): Promise<void> {
        try {
            user.accessToken = await this.accessToken.signAsync({
                userId: user.id
            });
            user.refreshToken = await this.refreshToken.signAsync({
                userId: user.id
            });
        } catch (error) {
            throw error;
        }
    }
}