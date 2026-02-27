import { NextFunction, Request, Response } from 'express';
import moment from 'moment';
import { AsyncLocalStorage } from 'async_hooks';

class LoggerBuilder {
  private storage: AsyncLocalStorage<{ message: string; }>;

  constructor() {
    this.storage = new AsyncLocalStorage();
    this.middleware = this.middleware.bind(this);
    this.message = this.message.bind(this);
    this.log = this.log.bind(this);
  }

  middleware(req: Request, res: Response, next: NextFunction) {
    this.log('DBG', req.method, req.originalUrl, res.statusCode, 'Request received');

    this.storage.run({ message: 'Request Completed' }, () => {
      res.on('finish', () => {
        const { message } = this.storage.getStore();
        const level = res.statusCode < 400 ? 'INF' : 'ERR';
        this.log(level, req.method, req.originalUrl, res.statusCode, message);
      });

      res.on('error', (err) => {
        this.log('ERR', req.method, req.originalUrl, res.statusCode, 'Error occurred:', err.message);
      });

      // res.on('close', () => {
      //   const { message } = this.storage.getStore() || { message: 'Request Completed' };
      //   this.log('WRN', req.method, req.originalUrl, res.statusCode, message, 'request closed');
      // });
      next();
    });
  };


  log = (level: string, method: string, url: string, statusCode: number, ...message: string[]) => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    const line = `${date} ${level} ${method.toUpperCase()} ${url} ${statusCode} ${message}`;
    console.log(line);
    // fs.appendFile(path.join(__dirname, '../../logs/log.txt'), `${line} \n`, (err) => {
    //     if (err) console.log(err);
    // });
  };

  message(msg: string) {
    this.storage.enterWith({ message: msg });
  }
}

export default new LoggerBuilder();