import ICountryRepository from "../../repositories/ICountryRepository";
import prisma from "../../helpers/prismaClient";
import { TCountry } from "../../types/prismaTypes";

export default class CountryRepository implements ICountryRepository<TCountry> {
    async createManyCountries(countries: TCountry[]): Promise<number> {
        try {

            const createdCountries = await prisma.country.createMany({
                data: countries
            });

            return createdCountries.count;

        } catch (error) {
            console.log("Error creating countries: ", error);
            throw error;
        }
    }
}