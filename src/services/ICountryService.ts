import { Country } from "types/models";

export default interface ICountryService {
    createManyCountries(countries: Country[]): Promise<number>;
}