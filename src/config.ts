import * as dotenv from 'dotenv';
dotenv.config();

type AppConfig = {
    // App configuration
    APP_NAME: string;
    APP_PORT: string;

    // Redis configuration
    REDIS_HOST: string;
    REDIS_PORT: string;

    // Json Web Token configuration
    JWT_ISSUER: string;
    JWT_AUDIENCE: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXIPRES_IN: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
}

const config: AppConfig = {
    // App configuration
    APP_NAME: process.env.APP_NAME || 'elox-pro-api',
    APP_PORT: process.env.APP_PORT || '3000',

    // Redis configuration
    REDIS_HOST: process.env.REDIS_PORT || '6379',
    REDIS_PORT: process.env.REDIS_HOST || 'localhost',

    // Json Web Token configuration
    JWT_ISSUER: process.env.JWT_ISSUER || 'http://localhost:3000',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'http://localhost:3000',
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'access-token-secret',
    JWT_ACCESS_TOKEN_EXIPRES_IN: process.env.JWT_ACCESS_TOKEN_EXIPRES_IN || '30m',
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh-token-secret',
    JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '45m',
}

export default config;