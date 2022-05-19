import keys from "./keys";

class BaseMapScene extends Phaser.Scene {
  create() {
    //this.createAnimations();
    //this.mapKeys();
  }

  mapKeys() {
    let key = this.input.keyboard.addKey("TAB");
    key.on("down", () => {
      this.scene.switch(keys.STATUS_SCENE);
    });
  }

  createAnimations() {
    this.anims.create({
      key: "left",
      frames: [
        { key: "playerMort", frame: "MortWalkSide1.png" },
        { key: "playerMort", frame: "MortWalkSide2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: [
        { key: "playerMort", frame: "MortWalkSide1.png" },
        { key: "playerMort", frame: "MortWalkSide2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: [
        { key: "playerMort", frame: "MortWalkUp1.png" },
        { key: "playerMort", frame: "MortWalkUp2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "down",
      frames: [
        { key: "playerMort", frame: "MortWalkDown1.png" },
        { key: "playerMort", frame: "MortWalkDown2.png" },
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  update(time, delta) {
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.anims.play("left", true);
      this.player.flipX = false;
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("right", true);
      this.player.flipX = true;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("down", true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default BaseMapScene;
