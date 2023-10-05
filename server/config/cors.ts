import cors, { CorsOptions } from 'cors';
import allowedOrigins from './allowed-origins';
import logger from '../tools/logger';

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true);
        } else {
            logger.error(`Origin ${origin} not allowed by CORS`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

export default () => cors(corsOptions);
