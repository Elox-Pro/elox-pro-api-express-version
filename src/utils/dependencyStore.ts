import DependencyManager from "../helpers/DependencyManager";
import IUserService from "../services/IUserService";
import UserService from "../services/UserService";
import ICountryService from "../services/ICountryService";
import CountryService from "../services/CountryService";

const manager = new DependencyManager();

export const useUserService = (): IUserService => {
    return manager.resolve(UserService.name, () => {
        const userService = new UserService();
        return userService;
    })
}

export const useCountryService = (): ICountryService => {
    return manager.resolve(CountryService.name, () => {
        const countryService = new CountryService();
        return countryService;
    })
}