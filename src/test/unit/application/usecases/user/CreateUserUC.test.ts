import CreateUserUC from 'application/usecases/user/CreateUserUC';
import CreateUserParams from 'domain/entities/user/CreateUserParams';
import User from 'domain/entities/user/User';
import { mockUserRepository, mockEncryptUtils } from '../mocks';
import PasswordMismatchError from 'domain/errors/PasswordMismatchError';

jest.mock('domain/interfaces/repositories/IUserRepository');
jest.mock('domain/interfaces/utils/IEncryptUtils');

describe('CreateUserUC', () => {

    let userCreator: CreateUserUC;

    beforeEach(() => {
        userCreator = new CreateUserUC(
            mockUserRepository,
            mockEncryptUtils
        );
    });

    describe('execute', () => {
        it('should create a user when passwords match', async () => {
            const params: CreateUserParams = {
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
            mockUserRepository.createOne.mockResolvedValue(expectedUser);

            const user = await userCreator.execute(params);

            expect(mockEncryptUtils.hashPassword).toHaveBeenCalledWith(params.password1);
            expect(mockUserRepository.createOne).toHaveBeenCalledWith(expectedUser);
            expect(user).toBe(expectedUser);
        });

        it('should throw an error when passwords do not match', async () => {
            const params: CreateUserParams = {
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

});
