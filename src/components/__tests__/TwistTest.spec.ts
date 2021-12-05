import 'jest'
import {Twister} from '../../cube/twister'
describe('Twist', () => {
  const twister =new Twister();

    test('loop', () => {

        const expected = {
            type: 'undefined',
          };
         
         const result =twister.loop()
         expect(typeof result).toBe(expected.type);
     });
     test('update', () => {
      const expected = {
          type: 'undefined',
        };
       
       const result =twister.update()
       expect(typeof result).toBe(expected.type);
   });
   test('isTwisting', () => {

    const expected = {
        type: 'boolean',
      };
     
     const result =twister.isTwisting()
     expect(typeof result).toBe(expected.type);
 });
   });



