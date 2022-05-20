import Menu from "./Menu";

class ActionsMenu extends Menu {
  constructor(x, y, scene) {
    super(x, y, scene);
    this.battleScene = scene;
    this.addMenuItem("Attack");
    this.addMenuItem("Magic");
    this.addMenuItem("Rest");
    this.addMenuItem("Flee");
  }

  confirm() {
    // emit when player selects action

    this.battleScene.events.emit("SelectAction", {
      index: this.menuItemIndex,
      action: this.menuItems[this.menuItemIndex]._text,
    });
  }
}

export default ActionsMenu;
