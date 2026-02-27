import { Router } from 'express';
import controller from '../controllers/appointment';
import controllerAll from '../controllers/appointments';
import middleware from '../middleware/appointments';

const router: Router = Router();

router.get('/patient/:id', controllerAll.getByPatient);
router.get('/read/:id/', controller.read);
router.get('/:period', controllerAll.readAll);
router.get('/:id/get-minimal', controller.getFromEvent);
router.post('/new', middleware.create, controller.create);
router.put('/:id/content', middleware.update, controller.updateContent);

export default router;
