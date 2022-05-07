class MenuItem extends Phaser.GameObjects.Text {
  constructor(x, y, text, scene) {
    super(scene, x, y, text, { color: "#ffffff", align: "left", fontSize: 15 });
  }
  select() {
    this.setColor("#f8ff38");
  }

  deselect() {
    this.setColor("#ffffff");
  }
}

export default MenuItem;
