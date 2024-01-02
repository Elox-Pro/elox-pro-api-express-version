import User from "domain/entities/user/User";
import UserCreatorParams from "domain/entities/user/UserCreatorParams";
import ICaseUse from "domain/interfaces/usecases/IUseCase";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";

export default class UserCreator implements ICaseUse<UserCreatorParams, User> {

    constructor(
        readonly userRepository: IUserRepository,
        readonly encryptUtils: IEncryptUtils
    ) { }

    async execute(params: UserCreatorParams): Promise<User> {
        try {

            const {
                password1,
                password2
            } = params;

            if (password1 !== password2) {
                throw new Error('Passwords do not match');
            }

            const hashedPassword = await this.encryptUtils.hashPassword(password1);

            return await this.userRepository.create(new User(Object.assign(params, {
                password: hashedPassword
            })));

        } catch (error) {
            throw error;
        }
    }
}