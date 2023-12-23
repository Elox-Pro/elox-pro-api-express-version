import UserRepository from "../repositories/UserRepository";
import { hashPassword } from "../utils/encryptUtils";
import { TUser } from "types/models";

export default class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(user: TUser): Promise<TUser> {
        try {

            if (user.credential && user.credential.password) {
                user.credential.password = await hashPassword(user.credential.password);
            }

            return await this.userRepository.create(user);

        } catch (error) {
            console.error("Error creating user: ", error);
            throw error;
        }
    }

    async getUsers(): Promise<TUser[]> {
        try {
            return this.userRepository.findMany();
        } catch (error) {
            console.error("Error getting users: ", error);
            throw error;
        }
    }
}


