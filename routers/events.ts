import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/events';
import middleware from '../middleware/events';

router.get('/', controller.getEvents);
router.post('/', middleware.create, controller.create);
router.get('/calendar/:calendar', controller.getByCalendar)
router.put('/:id/date', controller.updateDate);
router.put('/:id/calendar', controller.updateCalendar);
router.put('/:id/add_appointment', middleware.addAppointment, controller.addAppointment);

export default router;
