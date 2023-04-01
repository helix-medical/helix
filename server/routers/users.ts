import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/users';

router.get('/', controller.readAll);

// Add middleware to validate request body
router.post('/add', controller.create);

export default router;
