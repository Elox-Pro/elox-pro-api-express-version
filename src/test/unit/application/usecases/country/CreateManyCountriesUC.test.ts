import CreateManyCountriesUC from 'application/usecases/country/CreateManyCountriesUC';
import Country from 'domain/entities/country/Country';
import CreateCountryParams from 'domain/entities/country/CreateCountryParams';
import ICountryRepository from 'domain/interfaces/repositories/ICountryRepository';
import { mockCountryRepository } from '';

jest.mock('domain/interfaces/repositories/ICountryRepository');

const mockCountryRepository = ICountryRepository as jest.MockedClass<ICountryRepository>;

describe('CreateManyCountriesUC', () => {
    let createManyCountriesUC: CreateManyCountriesUC;

    beforeEach(() => {
        createManyCountriesUC = new CreateManyCountriesUC(mockCountryRepository);
    });

    it('should create many countries using the repository', async () => {
        const mockParams: CreateCountryParams[] = [
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
        ];
        const mockCreatedCountriesCount = 2;

        mockCountryRepository.mockImplementationOnce(() => ({
            createMany: jest.fn().mockResolvedValue(mockCreatedCountriesCount),
        }));

        const createdCountriesCount = await createManyCountriesUC.execute(mockParams);

        expect(mockCountryRepository.createMany).toHaveBeenCalledTimes(1);
        expect(mockCountryRepository.createMany).toHaveBeenCalledWith([
            new Country(mockParams[0]),
            new Country(mockParams[1]),
        ]);
        expect(createdCountriesCount).toBe(mockCreatedCountriesCount);
    });

    it('should throw an error if the repository fails', async () => {
        const mockError = new Error('Something went wrong');
        mockCountryRepository.mockImplementationOnce(() => ({
            createMany: jest.fn().mockRejectedValue(mockError),
        }));

        await expect(createManyCountriesUC.execute([])).rejects.toThrow(mockError);
    });
});
