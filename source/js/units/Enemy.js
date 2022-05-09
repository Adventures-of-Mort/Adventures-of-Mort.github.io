import Unit from "./Unit";

class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
  }
}

export default Enemy;
