import { envs } from "../envs/envs";

const allowedOrigins = (process.env.CORS || '')
  .split(',')
  .map(origin => origin.trim());

const isDev = envs.nodeEnv === 'DEVELOPMENT';

console.log(allowedOrigins);
export const CorsOptions = {
  
  origin: (origin: string | undefined, callback: Function) => {
    if ((isDev && !origin) || allowedOrigins.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
};
