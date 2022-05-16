import Unit from "./Unit";

class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage, maxHP) {
    super(scene, x, y, texture, frame, type, hp, damage, maxHP);
  }
}

export default Enemy;
