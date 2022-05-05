import Unit from "./Unit";

const Player = new Phaser.Class({
  Extends: Unit,
  initialize: function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    Unit.call(this, scene, x, y, texture, frame, type, hp, damage);
    // flip the image so I don't have to edit it manually
    this.flipX = true;

    this.setScale(2);
  },
});

export default Player;
