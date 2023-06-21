import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import dateRoutes from './routes/date';
import textRoutes from './routes/welcome';
import userAdminRoutes from './routes/datausers';

const app = express();

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/', dateRoutes);
app.use('/', textRoutes);
app.use('/', userAdminRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});