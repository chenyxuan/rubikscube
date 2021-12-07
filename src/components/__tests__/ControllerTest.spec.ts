import 'jest'
import Controller  from '../../cube/controller'
import World from '../../cube/world'
import Interactor from '../../cube/interactor'
import Holder  from '../../cube/controller'
describe('Controller', () => {

  const number=1
  const world =new World();
  const holder =new Holder(world);
  const controller=new Controller(world)
  enum Face {L,R,D,U,B,F,}
  test('loop', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.loop()
     expect(typeof result).toBe(expected.type);
  });
  test('update', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.update()
     expect(typeof result).toBe(expected.type);
  });
  test('handleDown', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.handleDown()
     expect(typeof result).toBe(expected.type);
  });
  test('handleMove', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.handleMove()
     expect(typeof result).toBe(expected.type);
  });
  test('handleUp', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.handleUp()
     expect(typeof result).toBe(expected.type);
  });
  test('constructor', () => {
    const expected = {
        type: 'undefined',
      };
     const result =controller.constructor(world)
     expect(typeof result).toBe(expected.type);
  });
  test('holder_constructor', () => {
    const expected = {
        type: 'undefined',
      };
     const result =holder.constructor(world)
     expect(typeof result).toBe(expected.type);
  });
  test('variable', () => {
    const expected = {
        type1: 'boolean',
        type2: 'number',
        type3: 'object',
        type4: 'string',
      };  
     const result1 =controller._lock
     const result2 =controller._disable
     const result3 =controller.down_tick
     const result4 =controller.dragging
     const result5 =controller.axis
     const result6 =controller.angle
     const result7 =controller.contingle
     const result8 =controller.down
     const result9 =controller.move
     expect(typeof result1).toBe(expected.type1);
     expect(typeof result2).toBe(expected.type1);
     expect(typeof result3).toBe(expected.type2);
     expect(typeof result4).toBe(expected.type1);
     expect(typeof result5).toBe(expected.type4);
     expect(typeof result6).toBe(expected.type2);
     expect(typeof result7).toBe(expected.type2);
     expect(typeof result8).toBe(expected.type3);
     expect(typeof result9).toBe(expected.type3);
  });


   });