import "dotenv/config";

type EnvConfig = {
    PORT: number | string;
    NODE_ENV: 'development' | 'production' | 'test';
    DB_URL: string | undefined;
    FRONTEND_URL: string | undefined;
    CLERK_PUBLISHABLE_KEY?: string;
    CLERK_SECRET_KEY?: string;
}

export const ENV: EnvConfig = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
    DB_URL: process.env.DB_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
}