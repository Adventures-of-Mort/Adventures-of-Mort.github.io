class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    this.scene.launch("StartUIScene");
  }
}

export default StartScene;
