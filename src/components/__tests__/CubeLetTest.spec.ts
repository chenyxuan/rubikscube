import 'jest'
import Cubelet from '../../cube/cubelet'

describe('Cubelet', () => {
  const number=1
  const cubelet=new Cubelet(number)
  enum Face {L,R,D,U,B,F,}
  test('getColorOf', () => {
      const expected = ["L","R","F","B","U","D","?"];
      const result=cubelet.getColorOf(Face.D)
       expect(expected).toContain(result);
   });
  test('convertFace', () => {
    const expected = {
        type: 'number',
      };
     const result =cubelet.convertFace(Face.D)
     expect(typeof result).toBe(expected.type);
  });
  test('constructor', () => {
    const expected = {
        type: 'object',
      };
     const result =cubelet.constructor(number)
     expect(typeof result).toBe(expected.type);
  });
   });