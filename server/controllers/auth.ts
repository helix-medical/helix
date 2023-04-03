import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../tools/interfaces';
require('dotenv').config();

const queryLogin = async (values: any, req: Request): Promise<IUser> => {
    const sqlQuery = `SELECT * FROM users WHERE uid = ?`;
    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, (err: any, data: any) => {
            if (err) {
                logger.post(req.originalUrl, 'ERR', err);
                reject(err);
            } else {
                resolve(data[0]);
            }
        });
    });
};

const login = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    const { id, password } = req.body;
    let user: IUser;
    try {
        user = await queryLogin([id], req);
    } catch (err: any) {
        return res.status(sc.METHOD_FAILURE).json({ message: err.message });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        logger.post(req.originalUrl, 'ERR', 'Invalid password');
        return res.status(sc.UNAUTHORIZED).json({ message: 'Invalid password' });
    }

    const accessToken = jwt.sign({ id: user.uid }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '30s' });
    const refreshToken = jwt.sign({ id: user.uid }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '12h' });

    const sqlQuery = 'UPDATE users SET refreshToken = ? WHERE uid = ?';
    const values = [refreshToken, user.uid];

    db.query(sqlQuery, values, (err: any, data: any) => {
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
