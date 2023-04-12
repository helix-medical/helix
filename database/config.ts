import mysql from 'mysql';
require('dotenv').config();
import logger from '../system/logger';

const db = mysql.createConnection({
    host: process.env.HELIX_DB_HOST,
    user: process.env.HELIX_DB_USER,
    password: process.env.HELIX_DB_PASSWORD,
    database: process.env.HELIX_DB_NAME,
});

db.connect((err: any) => {
    if (err) {
        logger.error(err);
        return;
    }
    logger.info('Connected to database');
});

export default db;
