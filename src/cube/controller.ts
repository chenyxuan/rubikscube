import { Interaction } from "./interactor";
import World from "./world";



export default class Controller {  
  world : World;
  
  constructor(world: World) {
    this.world = world;
  }

  interact = (action: Interaction): void => {

  }
  
}