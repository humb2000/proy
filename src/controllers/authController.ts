import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'El nombre de usuario ya está en uso' });
        }

        // Cifrar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = new User({ username, password: hashedPassword, role: 'user' });
        await newUser.save();

        // Asignar el rol correspondiente al usuario
        if (username === 'admin') {
            newUser.role = 'admin';
        } else if (username === 'potato') {
            newUser.role = 'potato';
        }
        await newUser.save();

        // Generar un token JWT para el nuevo usuario
        const token = jwt.sign({ username, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registro exitoso', token });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ message: 'Ocurrió un error al registrar el usuario' });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Encontrar el usuario por su nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Verificar si la contraseña es correcta
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        // Generar un token JWT para el usuario autenticado
        const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Ocurrió un error al iniciar sesión' });
    }
};

export default { signup, login };
