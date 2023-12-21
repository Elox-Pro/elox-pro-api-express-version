import { User } from "types/models";
import IUserService from "../../services/IUserService";
import IUserRepository from "../../repositories/IUserRepository";
import UserRepository from "../../repositories/impl/UserRepository";
import { hashPassword } from "../../utils/encryptUtils";

export default class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: User): Promise<User> {
        try {

            if (user.credential) {
                user.credential.password = await hashPassword(user.credential.password);
            }

            return await this.userRepository.createUser(user);

        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }

    async getUsers(): Promise<User[]> {
        try {
            return this.userRepository.getUsers();
        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}


