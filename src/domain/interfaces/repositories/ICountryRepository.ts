import Country from "domain/entities/country/Country";
export default interface ICountryRepository {
    createMany(countries: Country[]): Promise<Number>;
}