import cors, { CorsOptions } from 'cors';
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin ?? '') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

export default () => cors(corsOptions);
