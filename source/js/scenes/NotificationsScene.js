import keys from "./keys";
import Message from "../menus/Message";

class NotificationsScene extends Phaser.Scene {
  constructor() {
    super({ key: keys.NOTIFICATION_SCENE });
  }
  create() {
    this.worldScene = this.scene.get(keys.WORLD_SCENE);
    this.message = new Message(this, this.worldScene.events);
    this.add.existing(this.message);
  }
}

export default NotificationsScene;
