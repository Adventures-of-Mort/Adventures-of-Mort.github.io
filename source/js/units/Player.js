import Unit from "./Unit";

class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage, maxHP, experience, attack) {
    super(scene, x, y, texture, frame, type, hp, damage, maxHP);
  }
}

export default Player;
