import Menu from "./Menu";

class MagicMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.battleScene = scene;
    this.addMenuItem("Ice");
    this.addMenuItem("Fire");
    this.addMenuItem("Bolt");
  }

  confirm() {
    // emit when player selects action

    this.battleScene.events.emit("MagicSelect", {
      index: this.menuItemIndex,
      spell: this.menuItems[this.menuItemIndex]._text,
    });
    this.visible = false;
  }
}

export default MagicMenu;
