import prisma from "../helpers/prismaClient";
import { TCountry } from "types/models";

export default class CountryRepository {
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