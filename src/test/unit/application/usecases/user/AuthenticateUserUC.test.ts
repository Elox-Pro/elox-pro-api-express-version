import User from "domain/entities/user/User";
import AuthenticateUserUC from "application/usecases/user/AuthenticateUserUC";
import AuthenticateUserParams from "domain/entities/user/AuthenticateUserParams";
import NotificationType from "domain/constants/NotificationType";
import UserNotFoundError from "domain/errors/UserNotFoundError";
import InvalidPasswordError from "domain/errors/InvalidPasswordError";

import {
    mockUserRepository,
    mockEncryptUtils,
    mockAccessToken,
    mockRefreshToken,
    mockSecondAuthCode,
    mockNotificationStore
} from '../mocks';

describe('UserAuthenticatorUC', () => {
    let userAuthenticator: AuthenticateUserUC;

    beforeEach(() => {
        userAuthenticator = new AuthenticateUserUC(
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

            const params = new AuthenticateUserParams('test', 'password');
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

            const params = new AuthenticateUserParams('test', 'password');
            const result = await userAuthenticator.execute(params);

            expect(result).toBe(user);
            expect(user.accessToken).toBeDefined();
            expect(user.refreshToken).toBeDefined();
        });

        it('should throw an error if user not found', async () => {
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(null);
            const params = new AuthenticateUserParams('test', 'password');
            await expect(userAuthenticator.execute(params)).rejects.toThrow(
                new UserNotFoundError(params.username)
            );
        });

        it('should throw an error if passwords do not match', async () => {
            const user = new User({ username: 'test', password: 'password' });
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
            mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(false);
            const params = new AuthenticateUserParams('test', 'password-x');
            await expect(userAuthenticator.execute(params)).rejects.toThrow(
                new InvalidPasswordError(params.username)
            );
        });

    });
});
