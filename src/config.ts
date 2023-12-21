import * as dotenv from 'dotenv';
dotenv.config();

type AppConfig = {
    APP_NAME: string;
    APP_PORT: string;
    REDIS_HOST: string;
    REDIS_PORT: string;
}

const config: AppConfig = {
    APP_NAME: process.env.APP_NAME || 'elox-pro-api',
    APP_PORT: process.env.APP_PORT || '3000',
    REDIS_HOST: process.env.REDIS_PORT || '6379',
    REDIS_PORT: process.env.REDIS_HOST || 'localhost'
}

export default config;

