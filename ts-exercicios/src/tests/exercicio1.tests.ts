import { quadradoComFor, quadradoComForEach } from '../exercicio1';

describe('quadradoComFor', () => {
  test('deve retornar os quadrados dos números', () => {
    expect(quadradoComFor([1, 2, 3])).toEqual([1, 4, 9]);
  });
});

describe('quadradoComForEach', () => {
  test('deve retornar os quadrados dos números', () => {
    expect(quadradoComForEach([2, 3, 4])).toEqual([4, 9, 16]);
  });
});