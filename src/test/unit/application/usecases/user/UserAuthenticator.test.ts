import User from "domain/entities/user/User";
import UserAuthenticator from "application/usecases/user/UserAuthenticator";
import UserAuthenticatorParams from "domain/entities/user/UserAuthenticatorParams";
import { mockUserRepository, mockEncryptUtils, mockAccessToken, mockRefreshToken, mockSecondAuthCode, mockNotificationStore } from './mocks';
import NotificationType from "domain/constants/NotificationType";
import UserNotFoundError from "domain/errors/UserNotFoundError";
import InvalidPasswordError from "domain/errors/InvalidPasswordError";

jest.mock("domain/interfaces/repositories/IUserRepository");
jest.mock("domain/interfaces/utils/IEncryptUtils");
jest.mock("domain/interfaces/utils/IJwtoken");
jest.mock("domain/interfaces/utils/ISecondAuthCode");
jest.mock("domain/interfaces/notification/user/IUserNotificationStore");

describe('UserAuthenticator', () => {
    let userAuthenticator: UserAuthenticator;

    beforeEach(() => {
        userAuthenticator = new UserAuthenticator(
            mockUserRepository,
            mockEncryptUtils,
            mockRefreshToken,
            mockAccessToken,
            mockSecondAuthCode,
            mockNotificationStore
        );
    });

    describe('execute', () => {

        it('should authenticate user successfully with second auth code required', async () => {
            const user = new User({
                id: 1,
                username: 'test',
                password: 'password',
                secondAuthCodeRequired: true,
                secondAuthCodeMethod: NotificationType.EMAIL
            });
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
            mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(true);
            mockSecondAuthCode.generate.mockResolvedValueOnce(123456);
            mockNotificationStore.getSecondAuthCodeNotif.mockReturnValueOnce({
                send: jest.fn()
            });

            const params = new UserAuthenticatorParams('test', 'password');
            const result = await userAuthenticator.execute(params);

            expect(result).toBe(user);
            expect(user.accessToken).toBeUndefined();
            expect(user.refreshToken).toBeUndefined();
        });

        it('should authenticate user successfully without second auth code required', async () => {
            const user = new User({
                id: 1,
                username: 'test',
                password: 'password',
                secondAuthCodeRequired: false,
                secondAuthCodeMethod: NotificationType.EMAIL
            });
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
            mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(true);
            mockSecondAuthCode.generate.mockResolvedValueOnce(123456);
            mockRefreshToken.signAsync.mockResolvedValueOnce('refresh_token');
            mockAccessToken.signAsync.mockResolvedValueOnce('access_token');

            const params = new UserAuthenticatorParams('test', 'password');
            const result = await userAuthenticator.execute(params);

            expect(result).toBe(user);
            expect(user.accessToken).toBeDefined();
            expect(user.refreshToken).toBeDefined();
        });

        it('should throw an error if user not found', async () => {
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(null);
            const params = new UserAuthenticatorParams('test', 'password');
            await expect(userAuthenticator.execute(params)).rejects.toThrow(
                new UserNotFoundError(params.username)
            );
        });

        it('should throw an error if passwords do not match', async () => {
            const user = new User({ username: 'test', password: 'password' });
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
            mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(false);
            const params = new UserAuthenticatorParams('test', 'password-x');
            await expect(userAuthenticator.execute(params)).rejects.toThrow(
                new InvalidPasswordError(params.username)
            );
        });

    });
});
