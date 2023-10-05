import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/users';

router.get('/users', controller.getForConnection);

export default router;
