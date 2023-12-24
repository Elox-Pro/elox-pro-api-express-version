export default interface ICountryRepository<T> {
    createManyCountries(countries: T[]): Promise<number>;
}