import { ordenarArray } from '../exercicio3';

describe('ordenarArray', () => {
  test('deve ordenar array de strings', () => {
    expect(ordenarArray(['carro', 'boneco', 'ave', 'lapis'])).toEqual(['ave', 'boneco', 'carro', 'lapis']);
  });
});