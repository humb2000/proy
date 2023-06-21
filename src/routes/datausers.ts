import { Router } from 'express';
import { authorizeRole } from '../middlewares/authorizeRole';
import User from '../models/user';

const router = Router();

// Ruta para obtener la lista de usuarios si eres un administrador
router.get('/users', authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

export default router;