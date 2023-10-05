import { Router, Request, Response } from 'express';
import accounting from './accounting';
import appointments from './appointments';
import auth from '../middleware/auth';
import authORoute from './auth';
import events from './events';
import patients from './patients';
import unsecured from './unsecured';
import users from './users';
import logger from '../tools/logger';
import sc from '../tools/status-codes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(sc.OK).json({ message: 'Helix: A System for Patient Management [[API]]' });
    logger.success(req, res, 'Return API');
});

// Routers
router.use('/unsecured', unsecured);
router.use('/auth', authORoute);

// Protected routes
router.use(auth.verifyToken);
router.use('/patients', patients);
router.use('/appointments', appointments);
router.use('/users', users);
router.use('/accounting', accounting);
router.use('/events', events);

export default router;
