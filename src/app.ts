import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authController from './controllers/authController';
import userController from './userController';
import { authenticateToken, authorize } from './middlewares/authenticateJWT';


// Configurar variables de entorno
dotenv.config();

// Configurar la conexión a la base de datos
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => console.log('Conexión a MongoDB exitosa'));

// Crear la aplicación
const app = express();
const port = process.env.PORT || 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(cors());

// Definir las rutas
app.post('/signup', authController.signup);
app.post('/login', authController.login);

app.get('/user', authenticateToken, authorize(['admin', 'user']), userController.getUser);
app.put('/user', authenticateToken, authorize(['admin', 'user']), userController.updateUser);

// Iniciar la aplicación
app.listen(port, () => console.log(`Servidor iniciado en el puerto ${port}`));
