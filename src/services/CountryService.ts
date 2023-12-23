
import CountryRepository from "../repositories/CountryRepository";
import { TCountry } from "types/models";

export default class CountryService {

    private countryRepository: CountryRepository;

    constructor() {
        this.countryRepository = new CountryRepository();
    }

    async createManyCountries(countries: TCountry[]): Promise<number> {
        try {
            return await this.countryRepository.createManyCountries(countries);
        } catch (error) {
            console.error("Error creating countries: ", error);
            throw error;
        }
    }
}