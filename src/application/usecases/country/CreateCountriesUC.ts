import 'reflect-metadata';
import { inject, injectable } from "inversify";
import { TInversify } from "domain/types/TInversify";
import IUseCase from "domain/interfaces/usecases/IUseCase";
import CreateCountryParams from "domain/entities/country/CreateCountryParams";
import ICountryRepository from "domain/interfaces/repositories/ICountryRepository";
import Country from "domain/entities/country/Country";

@injectable()
export default class CreateCountriesUC implements IUseCase<CreateCountryParams, Number> {

    constructor(
        @inject(TInversify.ICountryRepository)
        readonly countryRepository: ICountryRepository
    ) { }

    async execute(params: CreateCountryParams[]): Promise<Number> {
        try {
            const countries = params.map(params => new Country(params));
            return await this.countryRepository.createMany(countries);
        } catch (error) {
            throw error;
        }
    }
}
