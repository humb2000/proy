import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
