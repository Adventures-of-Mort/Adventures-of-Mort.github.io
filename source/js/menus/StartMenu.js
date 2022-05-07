import Menu from "./Menu";

class StartMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.addMenuItem("Start");
    this.addMenuItem("Debug Mode");
    console.log("start");
  }
  confirm() {
    // do something when the player selects an action
    console.log("start menu still exists");
    this.scene.events.emit("StartMenuSelect", this.menuItemIndex);
  }
  create() {
    const startScene = this.scene.get("StartScene");
    console.log("hello");
  }
}

export default StartMenu;
