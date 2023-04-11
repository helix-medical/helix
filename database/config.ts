import mysql from 'mysql';
require('dotenv').config();
import logger from '../system/logger';

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
});

db.connect((err: any) => {
    if (err) {
        logger.error(err);
        return;
    }
    logger.info('Connected to database');
});

export default db;
