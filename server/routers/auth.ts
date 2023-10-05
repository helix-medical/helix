import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/auth';
import middleware from '../middleware/auth';

router.post('/login', middleware.login, controller.login);
router.get('/refresh-token', controller.refreshToken);
router.get('/logout', controller.logout);

export default router;
