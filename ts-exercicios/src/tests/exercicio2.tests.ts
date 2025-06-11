import { concatenarComEspaco } from '../exercicio2';

describe('concatenarComEspaco', () => {
  test('deve concatenar palavras com espaço', () => {
    expect(concatenarComEspaco(['Arrays', 'com', 'TypeScript'])).toBe('Arrays com TypeScript');
  });
});