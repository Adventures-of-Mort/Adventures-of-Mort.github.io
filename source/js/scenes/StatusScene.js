import keys from "./keys";
import mort from "../characters/mort";
import skeleman from "../characters/skelemen";
import hanzIV from "../characters/hanzIV";

class StatusScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.STATUS_SCENE });
  }

  create() {
    let party = [mort, skeleman, hanzIV];
    let sceneContext = this.registry.get("context");

    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);

    this.graphics.strokeRect(20, 20, 280, 200);
    this.graphics.fillRect(21, 21, 278, 198);

    const styles = { fontSize: "10px" };

    for (let i = 0; i < party.length; i++) {
      let partyMember = party[i];

      this.graphics.strokeRect(20, 74 + 60 * i, 280, 1);
      // x, y, text
      this.add.text(40, i * 55 + 28, `${partyMember.type}`, { fontSize: "14px" });
      this.add.text(200, i * 55 + 30, `HP: ${partyMember.currentHP}/ ${partyMember.maxHP}`, styles);
      this.add.text(200, i * 55 + 44, `Dmg: ${partyMember.attack}`, styles);
      this.add.text(200, i * 55 + 58, `Exp: ${partyMember.experience}/ ${partyMember.toNextLevel}`, styles);
    }

    this.add.image(55, 55, "battleMort");
    this.add.image(55, 114, "skeleman");
    this.add.image(55, 169, "hanz");
    this.add.text(98, 199, `Party Level: ${mort.level}`, { fontSize: "14px" });

    let key = this.input.keyboard.addKey("TAB");
    key.on("down", () => {
      this.scene.stop();
      this.scene.run(sceneContext.currentScene);
    });
  }
}

export default StatusScene;
