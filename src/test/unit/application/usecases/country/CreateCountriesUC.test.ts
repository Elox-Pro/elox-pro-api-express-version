import CreateCountriesUC from 'application/usecases/country/CreateCountriesUC';
import CreateCountryParams from 'domain/entities/country/CreateCountryParams';
import { mockCountryRepository } from '../mocks';

describe('CreateCountriesUC', () => {

    let createCountriesUC: CreateCountriesUC;

    beforeEach(() => {
        createCountriesUC = new CreateCountriesUC(mockCountryRepository);
    });

    describe('execute', () => {

        it('should create many countries using the repository', async () => {
            const mockParams: CreateCountryParams[] = [
                { name: 'France', iso2: 'FR', e164: 233 },
                { name: 'Germany', iso2: 'DE', e164: 49 },
            ];
            const mockCreatedCountriesCount = mockParams.length;

            mockCountryRepository.createMany.mockResolvedValueOnce(mockParams.length);

            const createdCountriesCount = await createCountriesUC.execute(mockParams);

            expect(mockCountryRepository.createMany).toHaveBeenCalledTimes(1);
            expect(createdCountriesCount).toBe(mockCreatedCountriesCount);
        });

        it('should throw an error if the repository fails', async () => {
            const mockError = new Error('Something went wrong');
            mockCountryRepository.createMany.mockRejectedValue(mockError)
            await expect(createCountriesUC.execute([])).rejects.toThrow(mockError);
        });

    });

});
