import ICountryRepository from "../ICountryRepository";
import prisma from "../../helpers/prismaClient";
import { Country } from "types/models";

export default class CountryRepository implements ICountryRepository {
    async createManyCountries(countries: Country[]): Promise<number> {
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