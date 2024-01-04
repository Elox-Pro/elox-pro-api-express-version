
export const mockUserRepository = {
    create: jest.fn(),
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