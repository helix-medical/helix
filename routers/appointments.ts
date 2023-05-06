import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/appointment';
import controllerAll from '../controllers/appointments';
import middleware from '../middleware/appointments';

router.get('/patient/:id', controllerAll.getByPatient);

router.get('/:period', controllerAll.readAll);

router.get('/:id/get-minimal', controller.getFromEvent);

router.get('/:id/:view', controller.read);

router.post('/new', middleware.create, controller.create);

router.put('/:id/content', middleware.update, controller.updateContent);

export default router;
