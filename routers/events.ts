import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/events';
// import middleware from '../middleware/events';

router.get('/', controller.getEvents);
router.post('/', controller.create);

export default router;
