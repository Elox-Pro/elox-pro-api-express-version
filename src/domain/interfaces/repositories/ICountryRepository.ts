import Country from "domain/entities/country/Country";
import IRepository from "./IRepository";
export default interface ICountryRepository extends IRepository<Country> { }