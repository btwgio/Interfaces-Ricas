import { extrairPares } from '../exercicio5';

describe('extrairPares', () => {
  test('deve retornar apenas os números pares', () => {
    expect(extrairPares([8, 3, 9, 5, 6, 12])).toEqual([8, 6, 12]);
    console.log(extrairPares(teste));
  });
});