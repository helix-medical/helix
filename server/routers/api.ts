import { Request, Response, Router } from 'express';
import accounting from './accounting';
import appointments from './appointments';
import events from './events';
import patients from './patients';
import unsecured from './unsecured';
import users from './users';
import sc from '../tools/status-codes';
import auth from '../middleware/logto-auth';
import log from '../tools/newLogger';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  log.message('Return API');
  res.status(sc.OK).json({ message: 'Helix: A System for Patient Management [[API]]' });
});

// Routers
router.use(auth.middleware);
router.use('/unsecured', unsecured);
// router.use('/auth', authORoute);
router.use('/patients', patients);
router.use('/appointments', appointments);
router.use('/users', users);
router.use('/accounting', accounting);
router.use('/events', events);

export default router;
