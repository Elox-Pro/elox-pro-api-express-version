jest.mock("domain/interfaces/authentication/IAccessToken");
jest.mock("domain/interfaces/authentication/IAuthenticationCode");
jest.mock("domain/interfaces/authentication/IRefreshToken");
jest.mock('domain/interfaces/repositories/ICountryRepository');
jest.mock("domain/interfaces/repositories/IUserRepository");
jest.mock("domain/interfaces/notification/user/IUserNotificationStore");
jest.mock("domain/interfaces/utils/IEncryptUtils");

export const mockUserRepository = {
    createOne: jest.fn(),
    findUniqueByUsername: jest.fn(),
};

export const mockEncryptUtils = {
    isPasswordMatched: jest.fn(),
    hashPassword: jest.fn(),
};

export const mockAccessToken = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
};

export const mockRefreshToken = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
};

export const mockSecondAuthCode = {
    generate: jest.fn(),
};

export const mockNotificationStore = {
    getSecondAuthCodeNotif: jest.fn(),
    getNotification: jest.fn(),
};

export const mockCountryRepository = {
    createMany: jest.fn(),
}