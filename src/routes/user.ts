import { Router } from 'express';
import { authorizeRole } from '../middlewares/authorizeRole';
import { getUsers, createUser } from '../controllers/userController';

const router = Router();

router.get('/', authorizeRole('admin'), getUsers);
router.post('/', authorizeRole('admin'), createUser);

export default router;