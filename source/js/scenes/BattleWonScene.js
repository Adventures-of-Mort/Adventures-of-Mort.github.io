import keys from "./keys";

class BattleWonScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.BATTLE_WON_SCENE });
  }

  preload() {}

  create() {
    this.music = this.sound.add("victory");
    this.music.play({ volume: 0.2 });

    this.battleScene = this.scene.get(keys.BATTLE_SCENE);
    this.battleUIScene = this.scene.get(keys.BATTLE_UI_SCENE);
    this.battleScene.events.emit("Message", "You Won! Press enter to continue.");

    let sceneContext = this.registry.get("context");

    let enterKey = this.input.keyboard.addKey("ENTER");
    enterKey.on("down", () => {
      this.music.stop();
      this.battleUIScene.message.hideMessage();
      this.scene.sleep(keys.BATTLE_UI_SCENE);

      this.scene.sleep(keys.BATTLE_SCENE);
      this.scene.switch(sceneContext.currentScene);
    });
  }
}

export default BattleWonScene;
