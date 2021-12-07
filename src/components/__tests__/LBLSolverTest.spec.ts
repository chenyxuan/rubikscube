import 'jest'
import LBLSolver from '../../cube/lbl'

describe('LBLSolver', () => {
  const state="UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"
  const lblsolver =new LBLSolver();
  lblsolver.getCubeState(state.split(""))
  enum Face {L,R,D,U,B,F,}
  test('Twist_B', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_B()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_R', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_R()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_F', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_F()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_L', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_L()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_U', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_U()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_D', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_D()
     expect(typeof result).toBe(expected.type);
  });
  test('Twist_Y', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.Twist_Y()
     expect(typeof result).toBe(expected.type);
  });
  test('changeState', () => {
    const expected = {
        type: 'undefined',
      };
     const result =lblsolver.changeState(state)
     expect(typeof result).toBe(expected.type);
  });
  test('getBlockPos', () => {
    const expected = {
        type: 'object',
      };
     const result =lblsolver.getBlockPos(state)
     expect(typeof result).toBe(expected.type);
  });
  test('SECOND_LAYER_SINGLE', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.SECOND_LAYER_SINGLE()
     expect(typeof result).toBe(expected.type);
  });
  test('FIRST_LAYER_EDGES', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.FIRST_LAYER_EDGES(state)
     expect(typeof result).toBe(expected.type);
  });
  test('FIRST_LAYER_CORNERS', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.FIRST_LAYER_CORNERS(state)
     expect(typeof result).toBe(expected.type);
  });
  test('SECOND_LAYER', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.SECOND_LAYER()
     expect(typeof result).toBe(expected.type);
  });
  
  test('TOP_CROSS', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.TOP_CROSS()
     expect(typeof result).toBe(expected.type);
  });
  test('THIRD_LAYER_CORNERS_POS', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.THIRD_LAYER_CORNERS_POS()
     expect(typeof result).toBe(expected.type);
  });
  test('THIRD_LAYER_CORNERS_ORI', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.THIRD_LAYER_CORNERS_ORI()
     expect(typeof result).toBe(expected.type);
  });
  test('THIRD_LAYER_EDGES', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.THIRD_LAYER_EDGES()
     expect(typeof result).toBe(expected.type);
  });
  test('solveCube', () => {
    const expected = {
        type: 'object',
      };
     const result =lblsolver.solveCube(state)
     expect(typeof result).toBe(expected.type);
  });
  test('compress', () => {
    const expected = {
        type: 'string',
      };
     const result =lblsolver.compress(state)
     expect(typeof result).toBe(expected.type);
  });
  test('solve', () => {
    const expected = {
        type: 'object',
      };
     const result =lblsolver.solve(state.split(""),state)
     expect(typeof result).toBe(expected.type);
  });
   });