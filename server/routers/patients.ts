import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/patient';
import controllerAll from '../controllers/patients';
import middleware from '../middleware/patients';

router.get('/', controllerAll.readAll);

router.use('/:id/add_appointment', middleware.addAppointment);
router.put('/:id/add_appointment/', controller.addAppointment);

router.get('/:id', controller.read);
router.delete('/:id', controller.delete);

router.use('/add', middleware.create);
router.post('/add', controller.create);

router.use('/:id', middleware.update);
router.put('/:id', controller.update);

export default router;
