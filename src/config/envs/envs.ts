
import 'dotenv/config';
import * as joi from 'joi';
import { EnvVars } from './envs.interface';

const envsSchema = joi.object<EnvVars>({
    AMBIENT: joi.string().valid('DOCKER', 'LOCAL').required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
    CLOUDINARY_CLOUD_NAME: joi.string().required(),
    CORS: joi.array().items(joi.string()).required(),
    GOOGLE_CLIENT_ID: joi.string().required(),
    GOOGLE_CLIENT_SECRET: joi.string().required(),
    GOOGLE_CALLBACK_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_SOURCE: joi.string().valid('BEARER', 'COOKIE').required(),
    MONGO_DB: joi.string().required(),
    MONGO_PASSWORD: joi.string().required(),
    MONGO_URL: joi.string().required(),
    MONGO_USER: joi.string().required(),
    NODE_ENV: joi.string().valid('DEVELOPMENT', 'PRODUCTION', 'TESTING').required(),
    PORT: joi.number().required(),
    REDIS_PORT: joi.number().required(),
    SMTP_HOST: joi.string().required(),
    SMTP_PASS: joi.string().required(),
    SMTP_PORT: joi.number().required(),
    SMTP_USER: joi.string().required(),
})
    .unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    CORS: process.env.CORS?.split(',')
});

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value

export const envs = {
    ambient: envVars.AMBIENT,
    cloudinaryApiKey: envVars.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: envVars.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: envVars.CLOUDINARY_CLOUD_NAME,
    cors: envVars.CORS,
    googleClientId: envVars.GOOGLE_CLIENT_ID,
    googleClientSecret: envVars.GOOGLE_CLIENT_SECRET,
    googleCallbackUrl: envVars.GOOGLE_CALLBACK_URL,
    jwtSecret: envVars.JWT_SECRET,
    jwtSource: envVars.JWT_SOURCE,
    mongoDb: envVars.MONGO_DB,
    mongoPassword: envVars.MONGO_PASSWORD,
    mongoUrl: envVars.MONGO_URL,
    mongoUser: envVars.MONGO_USER,
    nodeEnv: envVars.NODE_ENV,
    port: envVars.PORT,
    redisPort: envVars.REDIS_PORT,
    smtpHost: envVars.SMTP_HOST,
    smtpPass: envVars.SMTP_PASS,
    smtpPort: envVars.SMTP_PORT,
    smtpUser: envVars.SMTP_USER
}