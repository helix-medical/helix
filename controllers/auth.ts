import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../tools/interfaces';
import role from '../config/roles';
import moment from 'moment';
require('dotenv').config();

const queryAuth = async (query: string, values: any, req: Request): Promise<IUser> => {
    return new Promise((resolve, reject) => {
        db.query(query, values, (err: any, data: any) => {
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
        user = await queryAuth(`SELECT * FROM users WHERE uid = ?`, [id], req);
    } catch (err: any) {
        return res.status(sc.UNAUTHORIZED).json({ message: err.message });
    }

    if (!user) {
        logger.post(req.originalUrl, 'ERR', 'User not found');
        return res.status(sc.UNAUTHORIZED).json({ message: 'User not found' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
        logger.post(req.originalUrl, 'ERR', 'Invalid password');
        return res.status(sc.UNAUTHORIZED).json({ message: 'Invalid password' });
    }

    const roleCode = role.getCode(user.role);
    const accessToken = jwt.sign(
        {
            userData: {
                id: user.uid,
                role: roleCode,
            },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '10m' }
    );
    const refreshToken = jwt.sign({ id: user.uid }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '12h' });

    const sqlQuery = 'UPDATE users SET refreshToken = ?, `lastActive` = ? WHERE uid = ?';
    const values = [refreshToken, moment().format('YYYY-MM-DD HH:mm:ss'), user.uid];

    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: err.message });
        }
        logger.success('Refresh token added to database');
    });
    logger.post(req.originalUrl, 'OK', `User ${id} logged in`);
    res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    return res.status(sc.ACCEPTED).json({
        id: id,
        name: user.name,
        message: `User ${id} successfully logged in`,
        token: accessToken,
    });
};

const refreshToken = async (req: Request, res: Response) => {
    logger.get(req.originalUrl, 'REQ');
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(sc.UNAUTHORIZED).json({ message: 'No token provided' });
    const refreshToken = cookies.jwt;
    let user: IUser;
    try {
        user = await queryAuth(`SELECT * FROM users WHERE refreshToken = ?`, [refreshToken], req);
    } catch (err: any) {
        logger.get(req.originalUrl, 'ERR', err.message);
        return res.status(sc.FORBIDDEN).json({ message: err.message });
    }

    if (!user) {
        logger.get(req.originalUrl, 'ERR', 'User not found');
        return res.status(sc.FORBIDDEN).json({ message: 'User not found' });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err: any, decoded: any) => {
        if (err || user.uid !== decoded.id) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.FORBIDDEN).json({ message: err });
        } else {
            const accessToken = jwt.sign(
                {
                    userData: {
                        id: decoded.id,
                        role: role.getCode(user.role),
                    },
                },
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: '30s' }
            );
            logger.get(req.originalUrl, 'OK', `User ${user.uid} refreshed token`);
            return res.status(sc.ACCEPTED).json({
                id: user.uid,
                name: user.name,
                message: `User successfully logged in`,
                token: accessToken,
            });
        }
    });
};

const logout = async (req: Request, res: Response) => {
    // on client, delete access token
    logger.get(req.originalUrl, 'REQ');
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(sc.ACCEPTED).json({ message: 'Already logged out' });
    const refreshToken = cookies.jwt;
    let user: IUser;
    try {
        user = await queryAuth(`SELECT * FROM users WHERE refreshToken = ?`, [refreshToken], req);
    } catch (err: any) {
        logger.get(req.originalUrl, 'ERR', 'User not found, already logged out?');
        res.clearCookie('jwt', { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, sameSite: 'none', secure: true });
        return res.status(sc.ACCEPTED).json({ message: 'Already logged out' });
    }

    if (!user) {
        logger.get(req.originalUrl, 'ERR', 'User not found, already logged out?');
        res.clearCookie('jwt', { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, sameSite: 'none', secure: true });
        return res.status(sc.ACCEPTED).json({ message: 'Already logged out' });
    }

    const sqlQuery = `UPDATE users SET refreshToken = NULL WHERE uid = ?`;
    const values = [user.uid];
    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.get(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json({ message: err.message });
        }
        logger.success('Refresh token removed from database');
    });
    res.clearCookie('jwt', { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, sameSite: 'none', secure: true });
    logger.get(req.originalUrl, 'OK', `User ${user.uid} logged out`);
    return res.status(sc.ACCEPTED).json({ id: user.uid, message: `User successfully logged out` });
};

export default module.exports = {
    login,
    refreshToken,
    logout,
};
