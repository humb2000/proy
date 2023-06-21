import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  username: string;
  password: string;
  email: string;
  role: string;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, default: 'user' },
  },
  { timestamps: true }
);

// Método para cifrar la contraseña antes de guardarla en la base de datos
userSchema.pre<UserDocument>('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar la contraseña cifrada con la proporcionada por el usuario
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = model<UserDocument>('User', userSchema);

export { User, UserDocument };