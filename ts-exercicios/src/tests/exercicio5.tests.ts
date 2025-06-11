import { filtrarPares } from '../exercicio5';

describe('filtrarPares', () => {
  test('deve retornar apenas os números pares', () => {
    expect(filtrarPares([8, 3, 9, 5, 6, 12])).toEqual([8, 6, 12]);
  });
});