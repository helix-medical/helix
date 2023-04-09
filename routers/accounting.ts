import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/accounting';
import middleware from '../middleware/accounting';

router.get('/:start/:end', controller.getTransactions);
router.get('/sum/:start/:end', controller.getSum);

router.post('/', middleware.create, controller.create);

export default router;
