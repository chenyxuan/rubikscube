import 'jest'
import World from '../../cube/world'
describe('World', () => {
  const world =new World();

    test('resize', () => {
        const expected = {
            type: 'undefined',
          };
         const result =world.resize(20,20)
         expect(typeof result).toBe(expected.type);
     });
     test('updateCamera', () => {
      const expected = {
          type: 'undefined',
        };
       const result =world.updateCamera()
       expect(typeof result).toBe(expected.type);
   });
   test('constructor', () => {
    const expected = {
        type: 'undefined',
      };
     const result =world.constructor()
     expect(typeof result).toBe(expected.type);
 });
   });



