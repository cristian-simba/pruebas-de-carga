// importar el schema y el modelo de mongoose
import { Schema, model } from 'mongoose';
// importar
import bcrypt from 'bcryptjs';

//crear el schema atributos de la tabla de la bdd
const veterinarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  direccion: {
    type: String,
    trim: true,
    default: null,
  },
  telefono: {
    type: Number,
    trim: true,
    default: null,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  token: {
    type: String,
    default: null,
  },
  confirmEmail: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Método para cifrar el password del veterinario
veterinarioSchema.methods.encryptPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const passwordEncrypted = await bcrypt.hash(password, salt);
  return passwordEncrypted;
};

// Método para verificar si el password ingresado es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function (password) {
  const response = await bcrypt.compare(password, this.password);
  return response;
};

// Método para crear un token
veterinarioSchema.methods.crearToken = function () {
  const tokenGenerado = this.token = Math.random().toString(36).slice(2);
  return tokenGenerado;
};

export default model('Veterinario', veterinarioSchema);
