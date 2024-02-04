import { login } from '../controllers/veterinario_controller';
import Veterinario from '../models/Veterinario';

describe('Pruebas unitarias para la función login', () => {
  it('debería devolver un mensaje de error si algún campo está vacío', async () => {
    const req = { body: { email: '', password: '' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debes llenar todos los campos' });
  });

  it('debería devolver un mensaje de error si el usuario no ha verificado su cuenta', async () => {
    const req = { body: { email: 'usuario@veterinario.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simular la existencia de un usuario sin verificar su cuenta en la base de datos
    jest.spyOn(Veterinario, 'findOne').mockResolvedValue({ email: 'usuario@veterinario.com', confirmEmail: false });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debe verificar su cuenta' });
  });

  it('debería devolver un token y la información del usuario si las credenciales son correctas', async () => {
    const req = { body: { email: 'usuarioverificado@veterinario.com', password: 'password123' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Simular la existencia de un usuario verificado en la base de datos
    jest.spyOn(Veterinario, 'findOne').mockResolvedValue({
      email: 'usuarioverificado@veterinario.com',
      confirmEmail: true,
      _id: '123456789',
      nombre: 'David',
      apellido: 'Simba',
      direccion: 'E5A',
      telefono: '093840912',
      matchPassword: jest.fn().mockResolvedValue(true), // Simular el correcto funcionamiento de matchPassword
    });

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: expect.any(String),
      nombre: 'David',
      apellido: 'Simba',
      direccion: 'E5A',
      telefono: '093840912',
      _id: '123456789',
      email: 'usuarioverificado@veterinario.com',
    });
  });
});
