import db from '../database/config';
import logger from '../system/logger';

interface ICheckId {
    count: number;
}

const checkId = async (id: string, table: string, parameter: string): Promise<boolean> => {
    const sqlQuery = `SELECT COUNT(*) as count FROM ${table} WHERE ${parameter} = ?`;
    const values = [id];

    return new Promise((resolve, reject) => {
        db.query(sqlQuery, values, (err: any, data: any) => {
            if (err) {
                logger.error(err);
                reject(err);
            } else {
                resolve(data[0].count !== 0);
            }
        });
    });
};

export default module.exports = {
    checkId,
};
