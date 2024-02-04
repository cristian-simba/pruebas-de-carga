import mongoose from 'mongoose';
import { detalleVeterinario } from '../controllers/veterinario_controller';
import Veterinario from '../models/Veterinario';

describe('Pruebas unitarias para la función detalleVeterinario', () => {
  it('debería devolver un error si el ID no es válido', async () => {
    const req = { params: { id: 'id_invalido' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await detalleVeterinario(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: 'Lo sentimos, debe ser un id válido' });
  });

});
