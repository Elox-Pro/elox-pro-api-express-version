
export const mockUserRepository = {
    create: jest.fn(),
    findUniqueByUsername: jest.fn(),
};

export const mockEncryptUtils = {
    isPasswordMatched: jest.fn(),
    hashPassword: jest.fn(),
};

export const mockJwtoken = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
};

export const mockSecondAuthCode = {
    generate: jest.fn(),
};

export const mockNotificationContainer = {
    getSecondAuthCodeNotification: jest.fn(),
};