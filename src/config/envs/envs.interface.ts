export interface EnvVars {
    AMBIENT: string
    CLOUDINARY_API_KEY: string
    CLOUDINARY_API_SECRET: string
    CLOUDINARY_CLOUD_NAME: string
    CORS: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    FRONTEND_URL: string
    GOOGLE_CALLBACK_URL: string
    JWT_SECRET: string
    JWT_SOURCE: 'BEARER' | 'COOKIE'
    DATABASE_URL: string
    NODE_ENV: 'DEVELOPMENT' | 'PRODUCTION' | 'TESTING';
    PORT: number;
    SMTP_HOST: string;
    SMTP_PASS: string
    SMTP_PORT: number
    SMTP_USER: string
    HOST_REDIS: string,
    PORT_REDIS: number,
    USERNAME_REDIS: string,
    PASSWORD_REDIS: string,
    RESEND_API_KEY: string,
    RESEND_FROM: string
}   