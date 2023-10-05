import { Router, Request, Response, NextFunction } from 'express';
import path from 'path';
import sc from './tools/status-codes';
import logger from './tools/logger';
import { match } from 'assert';

const router: Router = Router();

router.get('*', (req: Request, res: Response) => {
    res.status(sc.OK).sendFile(path.join(__dirname, `public/${req.url}`));
    logger.success(req, res, 'Return client');
});

export default router;
