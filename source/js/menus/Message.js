import * as Phaser from "../phaser.js";

export default class Message extends Phaser.GameObjects.Container {
  constructor(scene, events) {
    super(scene, 160, 30);
    const graphics = this.scene.add.graphics();
    this.add(graphics);
    this.depth = 1000;

    graphics.lineStyle(1, 0xffffff, 0.8);
    graphics.fillStyle(0x031f4c, 0.3);
    graphics.strokeRect(-85, -25, 175, 50);
    graphics.fillRect(-85, -25, 175, 50);

    this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", {
      color: "#ffffff",
      align: "center",
      fontSize: 12,
      wordWrap: { width: 160, useAdvancedWrap: true },
    }).setOrigin(0.5);
    this.add(this.text);

    events.on("Message", this.showMessage, this);
    this.visible = false;
  }

  showMessage(text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent) {
      this.hideEvent.remove(false);
    }
    this.hideEvent = this.scene.time.addEvent({
      delay: 2000,
      callback: this.hideMessage,
      callbackScope: this,
    });
  }

  hideMessage() {
    this.hideEvent = null;
    this.visible = false;
  }
}
