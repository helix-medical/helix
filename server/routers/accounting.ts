import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/accounting';
import middleware from '../middleware/accounting';

router.get('/patient/:id', controller.getByPatient);
router.get('/sum/:start/:end', controller.getSum);
router.get('/:id/facture', controller.facture);
router.get('/:start/:end', controller.getTransactions);

router.post('/', middleware.create, controller.create);

export default router;
