import keys from "./keys";
import BaseMapScene from "./BaseMapScene";

class FinalBossScene extends BaseMapScene {
  constructor() {
    super({ key: keys.FINAL_SCENE });
  }

  preload() {
    this.load.image("finalFloorBackground", "../../../public/MORT/MAPS/Tilesets/stars.jpg");
  }

  create() {
    // create controls
    this.mapKeys();
    // crate scene context
    let context = this.registry.get("context");
    context.currentScene = keys.FINAL_SCENE;

    // create the map
    const map = this.make.tilemap({ key: "FinalTowerFloor" });

    // first parameter is the name of the tilemap in tiled

    const tiles = map.addTilesetImage("Tileset1", "finalFloorTiles");

    // creating the layers
    let background = this.add.image(500, 500, "finalFloorBackground");
    background.displayWidth = 1000;
    background.displayHeight = 1000;
    const collisionLayer = map.createLayer("Collision", tiles);
    const doorLayer = map.createLayer("door", tiles);
    const groundLayer = map.createLayer("Base Floor", tiles);
    const statueLayer = map.createLayer("Statues", tiles);

    let princess = this.add.image(385, 355, "boss");
    princess.displayHeight = 100;
    princess.displayWidth = 100;

    let dragon = this.add.image(385, 255, "dragon");
    dragon.displayHeight = 45;
    dragon.displayWidth = 45;

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // make all tiles in obstacles collidable
    collisionLayer.setCollisionByExclusion([-1]);
    doorLayer.setCollisionByProperty({ door: true });

    // our player sprite created through the physics system
    this.player = this.physics.add.sprite(385, 778, "playerMort");
    const frameNames = this.textures.get("playerMort").getFrameNames();

    // don't go out of the map
    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    // add audio
    this.music = this.sound.add("confusing_melody");
    this.music.play({ volume: 0.2, loop: true });

    // don't walk on into the water
    this.physics.add.collider(this.player, collisionLayer);

    //set up collision detection for door
    this.physics.add.collider(this.player, doorLayer, this.hitDoorLayer.bind(this));

    // limit camera to map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true; // avoid tile bleed

    // user input
    this.cursors = this.input.keyboard.createCursorKeys();

    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone,
    });
    // parameters are x, y, width, height
    this.spawns.create(385, 325, 105, 194);

    // add collider
    this.physics.add.overlap(this.player, this.spawns, this.onMeetBoss, false, this);

    //doors to next level
    this.physics.add.overlap(this.player, this.entrance, this.hitDoorLayer, false, this);

    this.sys.events.on(
      "wake",
      () => {
        // this.player.x =
        this.player.y = 440;
        this.cameras.main.fadeIn(500, 0, 0, 0);
      },
      this
    );

    this.events.on("sleep", () => {
      this.music.stop();
    });

    this.events.on("wake", () => {
      this.music.play({ volume: 0.2 });
    });
  }

  onMeetBoss(player, zone) {
    // we move the zone to some other location
    // zone.x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
    // zone.y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

    //fades to final boss
    this.cameras.main.fadeOut(500, 0, 0, 0);
    // start battle
    this.music.stop();
    this.scene.switch(keys.BOSS_SCENE);
  }

  hitDoorLayer(player, target) {
    this.cameras.main.fadeOut(500, 0, 0, 0);

    this.scene.switch(keys.TOWER_SCENE);
  }
}

export default FinalBossScene;
