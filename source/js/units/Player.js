import Unit from "./Unit";

class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;

    this.setScale(2);
  }
}

export default Player;
