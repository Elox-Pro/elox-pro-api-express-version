import ICountryService from "../ICountryService";
import ICountryRepository from "../../repositories/ICountryRepository";
import CountryRepository from "../../repositories/impl/CountryRepository";
import { Country } from "types/models";

export default class CountryService implements ICountryService {

    private countryRepository: ICountryRepository;

    constructor() {
        this.countryRepository = new CountryRepository();
    }

    async createManyCountries(countries: Country[]): Promise<number> {
        try {
            return await this.countryRepository.createManyCountries(countries);
        } catch (error) {
            console.error("Error creating countries: ", error);
            throw error;
        }
    }
}