import "dotenv/config";

type EnvConfig = {
    PORT: number | string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_URL: string | undefined;
}

export const ENV: EnvConfig = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    DB_URL: process.env.DB_URL
}