import 'jest'
import CubeGroup from '../../cube/group'
import Cube from '../../cube/cube'
describe('Twist', () => {
  const cube = new Cube();
  const Group =new CubeGroup(cube,"x",2);

    test('cancel', () => {

        const expected = {
            type: 'number',
          };
         
         const result =Group.cancel()
         expect(typeof result).toBe(expected.type);
     });
     test('finish', () => {

      const expected = {
          type: 'number',
        };
       
       const result =Group.finish()
       expect(typeof result).toBe(expected.type);
   });
   test('hold', () => {

    const expected = {
        type: 'boolean',
      };
     
     const result =Group.hold()
     expect(typeof result).toBe(expected.type);
 });
test('drop', () => {

  const expected = {
      type: 'undefined',
    };
   
   const result =Group.drop()
   expect(typeof result).toBe(expected.type);
});
test('twist', () => {
  var angle = 1
  angle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2);
  const expected = {
      type: 'boolean',
    };
   
   const result =Group.twist(angle,true)
   expect(typeof result).toBe(expected.type);
});




   });



