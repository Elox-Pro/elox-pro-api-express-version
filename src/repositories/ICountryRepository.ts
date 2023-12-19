import { Country } from "types/models";
export default interface ICountryRepository {
    createManyCountries(countries: Country[]): Promise<number>;
}