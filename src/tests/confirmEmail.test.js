import { confirmEmail } from '../controllers/veterinario_controller';
import Veterinario from '../models/Veterinario';

describe('Pruebas unitarias para la función confirmEmail', () => {
  it('debería devolver un error si no se proporciona un token', async () => {
    const req = { params: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await confirmEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, no se puede validar la cuenta' });
  });

  it('debería devolver un error si la cuenta ya ha sido confirmada', async () => {
    // Simular un veterinario con la cuenta ya confirmada
    jest.spyOn(Veterinario, 'findOne').mockResolvedValue({ token: null });

    const req = { params: { token: 'token_valido' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await confirmEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'La cuenta ya ha sido confirmada' });
  });

  it('debería confirmar la cuenta y devolver un mensaje de éxito', async () => {
    // Simular un veterinario con el token válido
    jest.spyOn(Veterinario, 'findOne').mockResolvedValue({ token: 'token_valido', save: jest.fn() });

    const req = { params: { token: 'token_valido' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await confirmEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Token confirmado, ya puedes iniciar sesión' });
  });

});
