import 'jest';
import { mount } from '@vue/test-utils'
import  Cube  from "../../cube/cube"

describe('Playground', () => {
    test('solve', () => {
        const cube = new Cube();
        expect(cube.serialize()).toEqual("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB".split(""));
    });
  });