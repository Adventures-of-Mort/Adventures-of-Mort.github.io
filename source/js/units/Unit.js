const Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,
  initialize: function Unit(scene, x, y, texture, frame, type, hp, damage) {
    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage; // default damage
  },
  attack: function (target) {
    target.takeDamage(this.damage);
  },
  takeDamage: function (damage) {
    this.hp -= damage;
  },
});

export default Unit;
