import keys from "./keys";
import mort from "../characters/mort";
import skeleman from "../characters/skelemen";

class StatusScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.STATUS_SCENE });
  }

  create() {
    let party = [mort, skeleman];
    let sceneContext = this.registry.get("context");

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);

    this.graphics.strokeRect(20, 20, 280, 200);
    this.graphics.fillRect(21, 21, 278, 198);

    const styles = { fontSize: "10px" };

    for (let i = 0; i < party.length; i++) {
      let partyMember = party[i];
      this.graphics.strokeRect(20, 70 + 60 * i, 280, 1);
      this.add.text(40, i * 50 + 25, `${partyMember.type}`);
      this.add.text(200, i * 50 + 25, `hp: ${partyMember.currentHP}/ ${partyMember.maxHP}`, styles);
      this.add.text(200, i * 50 + 50, `exp: ${partyMember.experience}/ ${partyMember.toNextLevel}`, styles);
    }

    let key = this.input.keyboard.addKey("TAB");
    key.on("down", () => {
      this.scene.stop();
      this.scene.run(sceneContext.currentScene);
    });
  }
}

export default StatusScene;
