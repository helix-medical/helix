import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/users';
import middleware from '../middleware/users';

router.get('/', controller.readAll);

// Add middleware to validate request body
router.use('/add', middleware.create);
router.post('/add', controller.create);

export default router;
