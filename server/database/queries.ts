import { Request, Response } from 'express';
import db from '../database/config';
import sc from '../tools/status-codes';
import log from '../tools/newLogger';

interface IId {
  id: string;
  name: string;
  verb?: string;
}

const checkId = async (id: string, table: string, parameter: string): Promise<boolean> => {
  const sqlQuery = `SELECT COUNT(*) AS count
                    FROM ${table}
                    WHERE ${parameter} = ?`;
  const values = [id];

  return new Promise((resolve, reject) => {
    db.query(sqlQuery, values, (err: any, data: any) => {
      if (err) {
        log.message(err);
        reject(err);
      } else {
        resolve(data[0].count !== 0);
      }
    });
  });
};

const push = async (req: Request, res: Response, sqlQuery: string, values: any[], meta: IId) => {
  db.query(sqlQuery, values, (err: any, data: any) => {
    if (err) {
      log.message(err);
      res.status(sc.BAD_REQUEST).json({ message: 'Bad Request' });
    } else if (data.affectedRows === 0) {
      log.message(`${meta.name} ${meta.id} not pushed`);
      res.status(sc.INTERNAL_SERVER_ERROR).json({ message: 'Data not pushed' });
    } else {
      log.message(`${meta.name} ${meta.id ?? 'all'} ${meta.verb ?? 'pushed'}}`);
      res.status(sc.OK).json({ id: meta.id, message: `${meta.name} ${meta.id} ${meta.verb ?? 'pushed'}` });
    }
  });
};

const pull = async (req: Request, res: Response, sqlQuery: string, values: any[], meta: IId) => {
  db.query(sqlQuery, values, (err: any, data: any) => {
    if (err) {
      log.message(err);
      res.status(sc.METHOD_FAILURE).json({ message: 'Method fails' });
    } else if (data.length === 0) {
      log.message(`${meta.name} ${meta.id} not found`);
      res.status(sc.NOT_FOUND).json({ message: `${meta.name} not found` });
    } else {
      log.message(`${meta.name} ${meta.id ?? 'all'} ${meta.verb ?? 'pulled'}`);
      res.status(sc.OK).json(data);
    }
  });
};

export default module.exports = {
  checkId,
  push,
  pull,
};
