import { pegarDoisPrimeiros } from '../exercicio4';

describe('pegarDoisPrimeiros', () => {
  test('deve retornar os dois primeiros números', () => {
    expect(pegarDoisPrimeiros([2, 4, 6, 2, 8, 9, 5])).toEqual([2, 4]);
  });
});