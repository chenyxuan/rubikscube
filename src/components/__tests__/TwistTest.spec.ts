import 'jest'
import {Twist, Twister} from '../../cube/twister'
describe('Twist', () => {
  const twister =new Twister();
  let cur = 0;
  const twist =new Twist(1,2,3,cur=>true);
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
 test('finish', () => {
  const expected = {
      type: 'undefined',
    };
   
   const result =twister.finish()
   expect(typeof result).toBe(expected.type);
});
test('cancel', () => {
  const expected = {
      type: 'undefined',
    };
   
   const result =twister.cancel(twist)
   expect(typeof result).toBe(expected.type);
});
test('twist_finish', () => {
  const expected = {
      type: 'undefined',
    };
   
   const result =twist.finish()
   expect(typeof result).toBe(expected.type);
});
test('twist_update', () => {
  const expected = {
      type: 'undefined',
    };
   
   const result =twist.update()
   expect(typeof result).toBe(expected.type);
});
test('twist_callback', () => {
  const expected = {
      type: 'boolean',
    };
   
   const result =twist.callback()
   expect(typeof result).toBe(expected.type);
});
   });



