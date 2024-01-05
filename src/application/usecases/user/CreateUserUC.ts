import User from "domain/entities/user/User";
import CreateUserParams from "domain/entities/user/CreateUserParams";
import IUseCase from "domain/interfaces/usecases/IUseCase";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";
import IEncryptUtils from "domain/interfaces/utils/IEncryptUtils";
import PasswordMismatchError from "domain/errors/PasswordMismatchError";

export default class CreateUserUC implements IUseCase<CreateUserParams, User> {

    constructor(
        readonly userRepository: IUserRepository,
        readonly encryptUtils: IEncryptUtils
    ) { }

    async execute(params: CreateUserParams): Promise<User> {
        try {

            const {
                password1,
                password2
            } = params;

            if (password1 !== password2) {
                throw new PasswordMismatchError();
            }

            const hashedPassword = await this.encryptUtils.hashPassword(password1);

            return await this.userRepository.createOne(new User(Object.assign(params, {
                password: hashedPassword
            })));

        } catch (error) {
            throw error;
        }
    }
}