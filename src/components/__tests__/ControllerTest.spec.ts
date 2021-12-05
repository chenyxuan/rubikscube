import 'jest'
import Controller from '../../cube/controller'
import World from '../../cube/world'
import Interactor from '../../cube/interactor'

describe('Controller', () => {

  const number=1
  const world =new World();
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
   });