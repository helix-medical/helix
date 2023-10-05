import allowedOrigins from '../config/allowed-origins';
import { Request, Response, NextFunction } from 'express';

const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin as string)) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    }
    next();
};

export default credentials;