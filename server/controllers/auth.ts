import { Response, Request } from 'express';
import db from '../database/config';
import logger from '../system/logger';
import sc from '../tools/statusCodes';
import bcrypt from 'bcrypt';

interface IUser {
    uid: string;
    password: string;
}

const login = async (req: Request, res: Response) => {
    logger.post(req.originalUrl, 'REQ');
    const { id, password } = req.body;
    const sqlQuery = `SELECT * FROM users WHERE uid = ?`;
    const values = [id];

    db.query(sqlQuery, values, (err: any, data: any) => {
        if (err) {
            logger.post(req.originalUrl, 'ERR', err);
            return res.status(sc.METHOD_FAILURE).json(err);
        }

        if (data.length === 0) {
            logger.post(req.originalUrl, 'ERR', 'User does not exist');
            return res.status(sc.NOT_FOUND).json({ message: 'User does not exist' });
        }

        const user = data[0];
        if (!bcrypt.compareSync(password, user.password)) {
            logger.post(req.originalUrl, 'ERR', 'Invalid password');
            return res.status(sc.UNAUTHORIZED).json({ message: 'Invalid password' });
        }

        logger.post(req.originalUrl, 'OK', `User ${id} logged in`);
        return res.status(sc.ACCEPTED).json({ id: id, message: `User successfully logged in` });
    });
};

export default module.exports = {
    login,
};
