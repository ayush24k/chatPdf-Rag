declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        QDRANT_URL: string;
        OPEN_API_KEY: string;
    }
}