import { Router } from 'express';
const router: Router = Router();
import controller from '../controllers/users';
import middleware from '../middleware/users';

router.get('/', controller.readAll);
router.get('/connexion', controller.getForConnection);
router.get('/practitioners', controller.getPractitioners);
router.get('/:id', controller.readOne);

router.post('/add', middleware.create, controller.create);

export default router;
