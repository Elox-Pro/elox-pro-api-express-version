import DependencyManager from "helpers/DependencyManager";
import prisma from "./prismaClient"
import UserService from "services/UserService";

const manager = new DependencyManager();

const useUserService = () => {
    const us: UserService = manager.resolve(UserService.name, () => {
        const userService: UserService = new UserService(prisma);
        return userService;
    })
    return us;
}




