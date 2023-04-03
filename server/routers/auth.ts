import {Router} from 'express';
const router: Router = Router();
import controller from '../controllers/auth';
import middleware from '../middleware/auth';

router.use('/login', middleware.login);
router.post('/login', controller.login);

export default router;