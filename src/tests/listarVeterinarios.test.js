import Veterinario from '../models/Veterinario';
import { listarVeterinarios } from '../controllers/veterinario_controller';

// Mockear todo el modelo
jest.mock('../models/Veterinario', () => ({
  findOne: jest.fn(),
}));

describe('Pruebas unitarias para la función listarVeterinarios', () => {
  it('debería devolver un mensaje de éxito si no hay error en el servidor', async () => {
    // Simular éxito en el servidor
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await listarVeterinarios(null, res); 

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ res: 'lista de veterinarios registrados' });
  });
});
