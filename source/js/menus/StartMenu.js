import Menu from "./Menu";

class StartMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem("Start");
    // this.addMenuItem("Debug Mode");
    this.startScene = scene;
  }
  create() {
    //this.startScene = this.scene;
  }
  confirm() {
    // do something when the player selects an action
    try {
      this.startScene.events.emit("StartMenuSelect", this.menuItemIndex);
    } catch (error) {
      console.log(error);
    }
  }
}

export default StartMenu;
