import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const login = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    const { id, password } = req.body;
    const sqlQuery = `SELECT * FROM users WHERE uid = ?`;
    const values = [id];

    const result: any = db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return { fail: true, status: sc.METHOD_FAILURE, message: err.message };
        }

        if (data.length === 0) {
            logger.post(req.originalUrl, 'ERR', 'User does not exist');
            return { fail: true, status: sc.NOT_FOUND, message: 'User does not exist' };
        }

        return { fail: false, user: data[0] };
    });

    if (result.fail) {
        return res.status(result.status).json({ message: result.message });
    }

    const user = result.user;

    if (!bcrypt.compareSync(password, user.password)) {
        logger.post(req.originalUrl, 'ERR', 'Invalid password');
        return res.status(sc.UNAUTHORIZED).json({ message: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user.uid }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' });
    const refreshToken = jwt.sign({ id: user.uid }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '12h' });
    const sqlQuery2 = 'UPDATE users SET refreshToken = ? WHERE uid = ?';
    const values2 = [refreshToken, user.uid];
    db.query(sqlQuery2, values2, (err: any, data: any) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: err.message });
        }
        logger.success('Refresh token added to database');
    });
    logger.post(req.originalUrl, 'OK', `User ${id} logged in`);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000 });
    return res.status(sc.ACCEPTED).json({ id: id, message: `User successfully logged in`, token: accessToken });
};

export default module.exports = {
    login,
};
