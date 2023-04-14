import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/appointment';
import controllerAll from '../controllers/appointments';
import middleware from '../middleware/appointments';

router.get('/:period', controllerAll.readAll);

// router.get('/:id/read', controller.read);

router.get('/:id/view', controller.getForView);
router.get('/:id/edit', controller.getForEdit);

router.post('/new', middleware.create, controller.create);

router.put('/:id/content', middleware.update, controller.updateContent);
router.put('/:id/date', controller.updateDate);
router.put('/:id/practitioner', controller.updatePractitioner);

export default router;
