import { NextFunction, Request, Response } from 'express';
import color from 'colors';
import moment from 'moment';
// import path from 'path';
// import fs from 'fs';

const colorMethod = (method: string) => {
  switch (method) {
    case 'GET':
      return 'GET'.green;
    case 'POST':
      return 'PST'.blue;
    case 'PUT':
      return 'PUT'.yellow;
    case 'DELETE':
      return 'DEL'.red;
    case 'USE':
      return 'USE'.magenta;
    case 'INFO':
      return 'INF'.cyan;
    case 'ERROR':
      return 'ERR'.red;
    default:
      return '???'.gray;
  }
};

const log = (method: string, state: string, url: string, ...message: string[]) => {
  color.enable();
  const date = moment().format('YYYY-MM-DD HH:mm:ss');
  const line = `${date} [${colorMethod(method)}] -- [${state}] -- ${url}${
    message.length > 0 ? ` -- ${message}` : ''
  }`;
  console.log(line);
  // fs.appendFile(path.join(__dirname, '../../logs/log.txt'), `${line} \n`, (err) => {
  //     if (err) console.log(err);
  // });
};

const checkpoint = (req: Request, res: Response, next: NextFunction) => {
  log(req.method, 'REQ'.gray, req.url);
  next();
};

const fail = (req: Request, res: Response, ...message: string[]) => {
  log(req.method, `${res.statusCode}`.red, req.originalUrl, ...message);
};

const success = (req: Request, res: Response, ...message: string[]) => {
  log(req.method, `${res.statusCode === 304 ? 200 : res.statusCode}`.green, req.originalUrl, ...message);
};

const info = (message: string) => {
  log('INFO', `200`.green, message);
};

const error = (message: string) => {
  log('ERROR', `500`.red, message);
};

export default {
  checkpoint,
  fail,
  success,
  info,
  error,
};
