import { TUser, TCountry } from "types/models";
import { fileToJson } from "../utils/fileUtils";
import {
    useUserService,
    useCountryService
} from "../utils/dependencyStore";

const filePath = "prisma/resources/data";
const userService = useUserService();
const countryService = useCountryService();

export default class DBSeeder {

    async seed() {
        try {
            await seedUsers();
            await seedCountries();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}

const seedUsers = async () => {
    const fileName = `${filePath}/users.json`;
    const users = fileToJson<TUser[]>(fileName);
    const promises = users.map(user => userService.createUser(user));
    await Promise.all(promises);
}

const seedCountries = async () => {
    const fileName = `${filePath}/countries.json`;
    const countries = fileToJson<TCountry[]>(fileName);
    await countryService.createManyCountries(countries);
}