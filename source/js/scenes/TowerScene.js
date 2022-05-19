import keys from "./keys";
import spawnGenerator from "../utilities/spawnGenerator";
import BaseMapScene from "./BaseMapScene";

class TowerScene extends BaseMapScene {
  constructor() {
    super({ key: keys.TOWER_SCENE });
  }

  preload() {}

  create() {
    // create the map
    const map = this.make.tilemap({ key: "floor1" });

    // first parameter is the name of the tilemap in tiled

    const tiles = map.addTilesetImage("Floor1", "floor1Tiles");

    // creating the layers
    const collisionLayer = map.createLayer("Collision", tiles);
    const doorLayer = map.createLayer("Door", tiles);
    const exitLayer = map.createLayer("Exit", tiles);
    const groundLayer = map.createLayer("Floor", tiles);
    const objectLayer = map.createLayer("Objects", tiles);

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    this.cameras.main.fadeIn(500, 0, 0, 0);

    // make all tiles in obstacles collidable
    collisionLayer.setCollisionByExclusion([-1]);
    doorLayer.setCollisionByProperty({ door: true });
    exitLayer.setCollisionByProperty({ exit: true });

    //audio
    this.music = this.sound.add("doomcastle");
    this.music.play({ volume: 0.2 });

    this.events.on("sleep", () => {
      this.music.stop();
    });

    this.events.on("wake", () => {
      this.music.play({ volume: 0.2 });
    });

    // our player sprite created through the physics system
    this.player = this.physics.add.sprite(455, 410, "playerMort");
    const frameNames = this.textures.get("playerMort").getFrameNames();

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // don't walk on into the water
    this.physics.add.collider(this.player, collisionLayer);

    //set up collision detection for door
    this.physics.add.collider(this.player, doorLayer, this.hitDoorLayer.bind(this));

    this.physics.add.collider(this.player, exitLayer, this.hitExitLayer.bind(this));

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    // where the enemies will be
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    spawnGenerator(0, 390, 0, this.physics.world.bounds.width, 15, this.spawns);
    // for (let i = 0; i < 15; i++) {
    //   let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    //   let y = Phaser.Math.RND.between(0, 390);
    //   // parameters are x, y, width, height
    //   this.spawns.create(x, y, 20, 20);
    // }

    // add collider
    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

    this.physics.add.overlap(this.player, this.entrance, this.hitDoorLayer, false, this);

    this.physics.add.overlap(this.player, this.entrance, this.hitExitLayer, false, this);

    this.sys.events.on(
      "wake",
      () => {
        this.cameras.main.fadeIn(500, 0, 0, 0);
      },
      this
    );
  }

  onMeetEnemy(player, zone) {
    // we move the zone to some other location
    zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    // fades out to battle
    this.cameras.main.fadeOut(500, 0, 0, 0);

    // start battle
    this.scene.switch(keys.BATTLE_SCENE);
  }

  hitDoorLayer(player, target) {
    this.cameras.main.fadeOut(500, 0, 0, 0);

    let context = this.registry.get("context");
    context.currentScene = keys.WORLD_SCENE;
    this.registry.set("context", context);

    this.music.pause();
    this.scene.switch(keys.WORLD_SCENE);
  }

  hitExitLayer(player, target) {
    this.cameras.main.fadeOut(500, 0, 0, 0);
    // change context.currentScene to FINAL_SCENE
    this.scene.switch(keys.FINAL_SCENE);
  }
}

export default TowerScene;
