import {Router} from 'express';
const router: Router = Router();
import controller from '../controllers/accounting';
import middleware from '../middleware/accounting';

router.get('/', controller.readAll);

router.post('/', middleware.create, controller.create);

export default router;