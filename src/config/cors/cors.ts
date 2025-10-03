import { envs } from "../envs/envs";

const allowedOrigins = (process.env.CORS || '')
  .split(',')
  .map(origin => origin.trim());

export const CorsOptions = {
  
  origin: (origin: string | undefined, callback: Function) => {
  // const isDev = envs.nodeEnv === 'DEVELOPMENT';
  const isDev = envs.nodeEnv === 'PRODUCTION';
  if(!origin){

    return callback(null, true);
  }

  if (isDev) {
    return callback(null, true);
  }

  if (origin && allowedOrigins.includes(origin)) {
    return callback(null, true);
  }

  return callback(new Error('Not allowed by CORS'));
},

  methods: 'GET,POST,PUT,DELETE,PATCH',
  credentials: true,
};
