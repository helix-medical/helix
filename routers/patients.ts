import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/patient';
import controllerAll from '../controllers/patients';
import middleware from '../middleware/patients';
import auth from '../middleware/auth';
import role from '../config/roles';

router.get('/', controllerAll.readAll);

router.get('/appointments', controllerAll.readAllConnexion);

router.put('/:id/add_appointment/', middleware.addAppointment, controller.addAppointment);

router.get('/:id', controller.read);
router.delete('/:id', auth.verifyRole(role.roles.practitioner), controller.delete);

router.post('/add', middleware.create, controller.create);

router.put('/:id', middleware.update, controller.update);

export default router;
