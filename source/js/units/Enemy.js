import Unit from "./Unit";

class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, level, hp, damage, maxHP, experience) {
    super(scene, x, y, texture, frame, type, hp, damage, maxHP);
    this.experience = experience;
    this.level = level;
  }
}

export default Enemy;
