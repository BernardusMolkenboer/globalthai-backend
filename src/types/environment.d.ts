
export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DATABASE_USER: string;
            DATABASE_PASS: string;
            DATABASE_DB: string;
            DATABASE_HOST: string;
            DATABASE_PORT: string;
        }
    }
}
