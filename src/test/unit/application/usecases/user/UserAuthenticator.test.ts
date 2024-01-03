import User from "domain/entities/user/User";
import UserAuthenticator from "application/usecases/user/UserAuthenticator";
import UserAuthenticatorParams from "domain/entities/user/UserAuthenticatorParams";
import { mockUserRepository, mockEncryptUtils, mockJwtoken, mockSecondAuthCode, mockNotificationContainer } from './mocks';
import AuthenticationMethod from "domain/constants/AuthenticationMethod";

jest.mock("domain/interfaces/repositories/IUserRepository");
jest.mock("domain/interfaces/utils/IEncryptUtils");
jest.mock("domain/interfaces/utils/IJwtoken");
jest.mock("domain/interfaces/utils/ISecondAuthCode");
jest.mock("notification/interfaces/INotificationContainer");

describe('UserAuthenticator', () => {
    let userAuthenticator: UserAuthenticator;

    beforeEach(() => {
        userAuthenticator = new UserAuthenticator(
            mockUserRepository,
            mockEncryptUtils,
            mockJwtoken,
            mockJwtoken,
            mockSecondAuthCode,
            mockNotificationContainer
        );
    });

    describe('execute', () => {

        // Test successful authentication
        test('Should authenticate user successfully with second auth code required', async () => {
            const user = new User({
                id: 1,
                username: 'test',
                password: 'password',
                secondAuthCodeRequired: true,
                secondAuthCodeMethod: AuthenticationMethod.EMAIL
            });
            mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
            mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(true);
            mockSecondAuthCode.generate.mockResolvedValueOnce(123456);
            mockNotificationContainer.getSecondAuthCodeNotification.mockReturnValueOnce({ send: jest.fn() });


            const params = new UserAuthenticatorParams('test', 'password');
            const result = await userAuthenticator.execute(params);

            expect(result).toBe(user);
            expect(user.accessToken).toBeUndefined();
        });


        //     it('should authenticate a user with correct credentials', async () => {
        //         const user = new User({ username: 'test', password: 'test' });
        //         mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
        //         mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(true);
        //         mockNotificationContainer.getSecondAuthCodeNotification.mockResolvedValueOnce({ send: jest.fn() });


        //         const params = new UserAuthenticatorParams('test', 'test');
        //         const result = await userAuthenticator.execute(params);

        //         expect(result).toBe(user);
        //         expect(mockUserRepository.findUniqueByUsername).toHaveBeenCalledWith('test');
        //         expect(mockEncryptUtils.isPasswordMatched).toHaveBeenCalledWith('test', user.password);
        //         expect(mockJwtoken.signAsync).toHaveBeenCalledWith({ userId: user.id });
        //         expect(mockNotificationContainer.getSecondAuthCodeNotification().send).toHaveBeenCalledWith(user, expect.any(Map));;
        //     });

        //     it('should throw an error if user not found', async () => {
        //         mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(null);

        //         const params = new UserAuthenticatorParams('test', 'test');
        //         await expect(userAuthenticator.execute(params)).rejects.toThrow('User not found');
        //     });

        //     it('should throw an error if passwords do not match', async () => {
        //         const user = new User({ username: 'test', password: 'test' });
        //         mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
        //         mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(false);
        //         mockNotificationContainer.getSecondAuthCodeNotification.mockResolvedValueOnce({ send: jest.fn() });

        //         const params = new UserAuthenticatorParams('test', 'test');
        //         await expect(userAuthenticator.execute(params)).rejects.toThrow('Passwords do not match');
        //     });

        //     it('should send second auth code notification if required', async () => {
        //         const user = new User({ username: 'test', password: 'test', secondAuthCodeRequired: true });
        //         mockUserRepository.findUniqueByUsername.mockResolvedValueOnce(user);
        //         mockEncryptUtils.isPasswordMatched.mockResolvedValueOnce(true);
        //         mockSecondAuthCode.generate.mockResolvedValueOnce('1234');
        //         mockNotificationContainer.getSecondAuthCodeNotification.mockResolvedValueOnce({ send: jest.fn() });

        //         const params = new UserAuthenticatorParams('test', 'test');
        //         await userAuthenticator.execute(params);

        //         expect(mockSecondAuthCode.generate).toHaveBeenCalledWith('test');
        //         expect(mockNotificationContainer.getSecondAuthCodeNotification).toHaveBeenCalledWith(user.secondAuthCodeMethod);
        //         expect(mockNotificationContainer.getSecondAuthCodeNotification().send).toHaveBeenCalled();
        //     });
    });
});
