import { Router } from 'express';

const router = Router();

// Ruta para mostrar un mensaje de bienvenida personalizado
router.get('/welcome', (req, res) => {
  const name = req.query.name as string | undefined;

  if (!name) {
    return res.status(400).json({ message: 'Se requiere el parámetro de cadena de consulta "name" para esta ruta' });
  }

  const welcomeMessage = `¡Bienvenido, ${name}! Espero que te encuentres bien hoy.`;

  res.json({ message: welcomeMessage });
});

export default router;