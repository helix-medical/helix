import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/appointment';
import controllerAll from '../controllers/appointments';
import middleware from '../middleware/appointments';

router.get('/', controllerAll.readAll);

// router.get('/:id/read', controller.read);

router.get('/:id/view', controller.getForView);
router.get('/:id/edit', controller.getForEdit);

router.use('/new', middleware.create);
router.post('/new', controller.create);

router.use('/:id', middleware.update);
router.put('/:id', controller.update);

export default router;
