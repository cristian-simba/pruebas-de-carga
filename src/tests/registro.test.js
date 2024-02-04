import { registro } from '../controllers/veterinario_controller'; 
import Veterinario from '../models/Veterinario';
import {sendMailToUser, sendMailToRecoveryPassword} from "../config/nodemailer.js"

describe('Pruebas unitarias para la función registro', () => {
  it('debería devolver un mensaje de error si algún campo está vacío', async () => {
    const req = { body: { email: '', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await registro(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
  });

  it('debería devolver un mensaje de error si el email ya está registrado', async () => {
    const req = { body: { email: 'correoexistente@example.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simular la existencia de un usuario con el mismo email en la base de datos
    jest.spyOn(Veterinario, 'findOne').mockResolvedValue({ email: 'correoexistente@example.com' });

    await registro(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, el email ya se encuentra registrado' });
  });
});
