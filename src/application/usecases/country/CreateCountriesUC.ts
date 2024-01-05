import Country from "domain/entities/country/Country";
import CreateCountryParams from "domain/entities/country/CreateCountryParams";
import ICountryRepository from "domain/interfaces/repositories/ICountryRepository";
import IUseCase from "domain/interfaces/usecases/IUseCase";

export default class CreateCountriesUC implements IUseCase<CreateCountryParams, Number> {

    constructor(private countryRepository: ICountryRepository) { }
    async execute(params: CreateCountryParams[]): Promise<Number> {
        try {
            const countries = params.map(params => new Country(params));
            return await this.countryRepository.createMany(countries);
        } catch (error) {
            throw error;
        }
    }
}