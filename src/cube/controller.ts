import World from "./world";

export class TouchAction {
  type: string;
  x: number;
  y: number;
  constructor(type: string, x: number, y: number) {
    this.type = type;
    this.x = x;
    this.y = y;
  }
}

export default class Controller {  
  world : World;
  
  constructor(world: World) {
    this.world = world;
  }

  interact = (action: TouchAction): void => {

  }
  
}