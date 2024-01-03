import UserCreator from 'application/usecases/user/UserCreator';
import UserCreatorParams from 'domain/entities/user/UserCreatorParams';
import User from 'domain/entities/user/User';

jest.mock('domain/interfaces/repositories/IUserRepository');
jest.mock('domain/interfaces/utils/IEncryptUtils');

describe('UserCreator', () => {

    let userRepository: any;
    let encryptUtils: any;
    let userCreator: UserCreator;

    beforeEach(() => {
        userRepository = { create: jest.fn() };
        encryptUtils = { hashPassword: jest.fn() };
        userCreator = new UserCreator(userRepository, encryptUtils);
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
        encryptUtils.hashPassword.mockResolvedValue(hashedPassword);
        const expectedUser = new User(Object.assign(params, { password: hashedPassword }));
        userRepository.create.mockResolvedValue(expectedUser);

        const user = await userCreator.execute(params);

        expect(encryptUtils.hashPassword).toHaveBeenCalledWith(params.password1);
        expect(userRepository.create).toHaveBeenCalledWith(expectedUser);
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
        await expect(userCreator.execute(params)).rejects.toThrow('Passwords do not match');
    });
});
