import { Router } from 'express';

const router = Router();

router.get('/datetime', (req, res) => {
  const now = new Date();
  res.send(`La fecha y hora actual es: ${now.toString()}`);
});

export default router;