import 'jest'
import Cube from '../../cube/cube'

describe('Cube', () => {
  const cube = new Cube();
  const state="UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"
    test('random3', () => {
        const expected = {
            type: 'number',
          };
         const result =cube.random3();
         expect(typeof result).toBe(expected.type);
     });
     test('serialize', () => {
      expect(cube.serialize()).toEqual(state.split(""));
   });
   test('lock', () => {
    const expected = {
        type: 'boolean',
      };
     const result =cube.lock("x",2)
     expect(typeof result).toBe(expected.type);
 });
 test('unlock', () => {
  const expected = {
      type: 'undefined',
    };
   const result =cube.unlock("x",2)
   expect(typeof result).toBe(expected.type);
});
test('callback', () => {
  const expected = {
      type: 'undefined',
    };
   const result =cube.callback()
   expect(typeof result).toBe(expected.type);
});
test('scramble', () => {
  const expected = {
      type: 'undefined',
    };
   const result =cube.scramble()
   expect(typeof result).toBe(expected.type);
});
test('reset', () => {
  const expected = {
      type: 'undefined',
    };
   const result =cube.reset()
   expect(typeof result).toBe(expected.type);
});
test('restore', () => {
  const expected = {
      type: 'undefined',
    };
   const result =cube.restore(state.split(""))
   expect(typeof result).toBe(expected.type);
});
test('dirty', () => {
   cube.constructor()
   expect(cube.dirty).toBe(true);
});
   });