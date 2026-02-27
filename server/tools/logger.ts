import { NextFunction, Request, Response } from 'express';
import moment from 'moment';

const log = (level: string, method: string, url: string, statusCode: number, ...message: string[]) => {
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  const line = `${date} ${level} ${method.toUpperCase()} ${url} ${statusCode} ${message}`;
  console.log(line);
  // fs.appendFile(path.join(__dirname, '../../logs/log.txt'), `${line} \n`, (err) => {
  //     if (err) console.log(err);
  // });
};

const checkpoint = (req: Request, res: Response, next: NextFunction) => {
  log('DBG', req.method, req.originalUrl, res.statusCode, 'Request received');
  next();
};

const fail = (req: Request, res: Response, ...message: string[]) => {
  log('INF', req.method, req.originalUrl, res.statusCode, ...message);

  res.on('finish', () => {
    console.log(`Response sent with status code ${res.statusCode}`);
  });
};

const success = (req: Request, res: Response, ...message: string[]) => {
  log('INF', req.method, req.originalUrl, res.statusCode, ...message);
};

const info = (message: string) => {
  log('INF', 'ALL', '/', 100, message);
};

const error = (message: string) => {
  log('ERR', 'ALL', '/', 500, message);
};

export default {
  log,
  checkpoint,
  fail,
  success,
  info,
  error,
};
