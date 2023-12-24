import DependencyManager from "../helpers/DependencyManager";
import UserService from "../services/UserService";
import CountryService from "../services/CountryService";

const manager = new DependencyManager();

export const useUserService = (): UserService => {
    return manager.resolve(UserService.name, () => {
        const userService = new UserService();
        return userService;
    })
}

export const useCountryService = (): CountryService => {
    return manager.resolve(CountryService.name, () => {
        const countryService = new CountryService();
        return countryService;
    })
}