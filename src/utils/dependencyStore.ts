import DependencyManager from "../helpers/DependencyManager";
import UserService from "../services/impl/UserService";
import IUserService from "../services/IUserService";

const manager = new DependencyManager();

export const useUserService = (): IUserService => {
    return manager.resolve(UserService.name, () => {
        const userService = new UserService();
        return userService;
    })
}