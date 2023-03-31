import mysql from 'mysql';
require('dotenv').config();
import logger from './system/logger';

const db = mysql.createConnection({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
});

db.connect((err: any) => {
    if (err) {
        logger.err(err);
        return;
    }
    logger.info('Connected to database');
});

// const execQueryAsync = (query: string, params: any) => {
//     return new Promise((resolve, reject) => {
//         db.query(query, params, (err: any, data: any) => {
//             if (err) reject(err);
//             else resolve(data);
//         });
//     });
// };

// const execQuery = (query: string) => {
//     db.query(query, (err: any, data: any) => {
//         if (err) {
//             logger.err(err);
//             return err;
//         } else {
//             logger.debug(data);
//             return data;
//         }
//     });
// };

export default db;
