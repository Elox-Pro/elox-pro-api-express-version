import User from "domain/entities/models/User";
import ICaseUse from "domain/interfaces/usecases/IUseCase";
import IUserRepository from "domain/interfaces/repositories/IUserRepository";

import UserCreatorParams from "application/usecases/user/params/UserCreatorParams";

export default class UserCreator implements ICaseUse<UserCreatorParams, User> {

    constructor(public readonly userRepository: IUserRepository) { }

    async execute(data: UserCreatorParams): Promise<User> {
        return await this.userRepository.create(new User(data));
    }
}