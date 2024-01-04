import UserCreator from 'application/usecases/user/UserCreator';
import UserCreatorParams from 'domain/entities/user/UserCreatorParams';
import User from 'domain/entities/user/User';
import { mockUserRepository, mockEncryptUtils } from './mocks';
import PasswordMismatchError from 'domain/errors/PasswordMismatchError';

jest.mock('domain/interfaces/repositories/IUserRepository');
jest.mock('domain/interfaces/utils/IEncryptUtils');

describe('UserCreator', () => {

    let userCreator: UserCreator;

    beforeEach(() => {
        userCreator = new UserCreator(
            mockUserRepository,
            mockEncryptUtils
        );
    });

    it('should create a user when passwords match', async () => {
        const params: UserCreatorParams = {
            username: 'testusername',
            email: '<EMAIL>',
            secondAuthMethod: 'email',
            password1: 'testpassword',
            password2: 'testpassword',
            role: 'user',
            emailVerified: true
        };
        const hashedPassword = 'hashed_password';
        mockEncryptUtils.hashPassword.mockResolvedValue(hashedPassword);
        const expectedUser = new User(Object.assign(params, { password: hashedPassword }));
        mockUserRepository.create.mockResolvedValue(expectedUser);

        const user = await userCreator.execute(params);

        expect(mockEncryptUtils.hashPassword).toHaveBeenCalledWith(params.password1);
        expect(mockUserRepository.create).toHaveBeenCalledWith(expectedUser);
        expect(user).toBe(expectedUser);
    });

    it('should throw an error when passwords do not match', async () => {
        const params: UserCreatorParams = {
            username: 'testusername',
            email: '<EMAIL>',
            secondAuthMethod: 'email',
            password1: 'testpassword',
            password2: 'another_testpassword',
            role: 'user',
            emailVerified: true
        };
        await expect(userCreator.execute(params)).rejects.toThrow(
            new PasswordMismatchError()
        );
    });
});
