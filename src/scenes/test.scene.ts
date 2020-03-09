import * as Phaser from "phaser";
import Ant from "../entities/ant";
import AntCopy from "../entities/ant.copy";
import SolidStone from "../entities/solid.stone";
import Rock from "../entities/rock";
import AcidParticle from "../entities/acid.particle";
import Powerup from "../entities/powerup";
import AntHud from "../entities/ant.hud";
import BallBug from "../entities/ball.bug";

export default class MainScene extends Phaser.Scene {

    // Properties
    // ---------------------------------

    player: AntCopy;
    keys: {
        up: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
        acid: Phaser.Input.Keyboard.Key,
        testKey: Phaser.Input.Keyboard.Key
    };
    currentRoom: {
        x: number,
        y: number
    };
    mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        tileset: Phaser.Tilemaps.Tileset,
        objects: Phaser.Tilemaps.ObjectLayer,
        background: Phaser.Tilemaps.DynamicTilemapLayer
    };
    entities: {
        solid: Phaser.Physics.Arcade.Group,
        rocks: Phaser.Physics.Arcade.Group,
        powerups: Phaser.Physics.Arcade.Group,
        ballbugs: Phaser.Physics.Arcade.Group,
    }
    antHud: AntHud;
    config: {
        mapSize: {
            x: number,
            y: number
        },
        bounds: {
            width: number,
            height: number
        }
    }

    // Constructor
    // ---------------------------------


    constructor() {
        super({
            key: "TestScene"
        });
    }

    // Creation and configuration methods
    // ------------------------------------

    init() {
        this.createConfigData();
        this.createPlayer();
        this.createMap();
        this.createKeys();
        this.createHud();
    }

    createConfigData() {
        this.config = {
            mapSize: { x: 4, y: 4 },
            bounds: { width: 128, height: 96 }
        }
    }

    createMap() {

        // initialize room coords
        this.currentRoom = {
            x: 0,
            y: 0
        };

        // initialize map
        const map = this.make.tilemap({ key: "maps" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);

        // set values to mapLayers object
        this.mapLayers = {
            map: map,
            tileset: tileset,
            background: null,
            objects: null
        }

        // crate entities 
        this.entities = {
            solid: this.physics.add.group({ immovable: true }),
            rocks: this.physics.add.group({ immovable: true }),
            powerups: this.physics.add.group({ immovable: true }),
            ballbugs: this.physics.add.group(),
        }

        // initialize main layer
        this.changeRoom();
    }

    changeRoom() {
        // get string coords
        const x = this.currentRoom.x.toString();
        const y = this.currentRoom.y.toString();

        // get layers names
        const background = x + y + "/b";
        const objects = x + y + "/o";

        if (this.mapLayers.background) {
            this.clearMap();
        }

        this.mapLayers.background = this.mapLayers.map.createDynamicLayer(
            background,
            this.mapLayers.tileset,
            0,
            0
        ).setDepth(1);
        this.mapLayers.objects = this.mapLayers.map.getObjectLayer(objects);
        this.createObjects();
    }

    clearMap() {
        this.mapLayers.background.destroy(false); // false if you doesn't want to erase this map from tilemap
        this.mapLayers.objects = null;
        this.entities.solid.clear(true);
        this.entities.rocks.clear(true);
        this.entities.powerups.clear(true);
        this.entities.ballbugs.clear(true);
    }

    createObjects() {
        // create entities groups
        if (!this.entities.solid)
            this.entities.solid = this.physics.add.group({ immovable: true });

        // iterates all layer objects
        for (let i = 0; i < this.mapLayers.objects.objects.length; i++) {
            const object = this.mapLayers.objects.objects[i];

            // create each type object
            switch (object.type) {
                case "solidStone":
                    this.entities.solid.add(new SolidStone(this, object.x, object.y).setDepth(3));
                    break;
                case "rock":
                    this.entities.rocks.add(new Rock(this, object.x, object.y).setDepth(3));
                    break;
                case "powerup":
                    this.entities.powerups.add(new Powerup(this, object.x, object.y, object.name).setDepth(3));
                    break;
                case "ballbug":
                    const b = new BallBug(this, object.x, object.y).setDepth(3);
                    this.entities.ballbugs.add(b);
                    b.init();
                    break;


                default:
                    break;
            }

        }



    }

    createPlayer() {
        this.player = new AntCopy(this);
        this.player.setPosition(16, 32);
    }

    createHud() {
        this.antHud = new AntHud(this);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            acid: this.input.keyboard.addKey("space"),
            testKey: this.input.keyboard.addKey("q")
        }
    }

    createCollisions() {

    }

    // Game loop methods
    // ---------------------------------

    update() {
        this.checkCollisions();
        this.checkInput();
        this.checkRoom();
        this.checkHud();
    }

    checkInput() {
        if (this.keys.up.isDown) this.player.move("up");
        if (this.keys.left.isDown) this.player.move("left");
        if (this.keys.right.isDown) this.player.move("right");
        if (this.keys.acid.isDown) {
            this.player.throwAcid();
        }

        if (this.keys.testKey.isDown) {
            //this.player.acidLevelMax = 200;
            this.player.setAcidRegenerationSpeed(80);
        }
    }

    checkRoom() {
        if (this.player.y < 0) {
            if (this.currentRoom.y >= this.config.mapSize.y) {
                this.player.y = 0;
            } else {
                this.currentRoom.y++;
                this.player.y = this.config.bounds.height;
                this.changeRoom();
            }
        }

        if (this.player.y > this.config.bounds.height) {
            if (this.currentRoom.y <= 0) {
                this.player.y = this.config.bounds.height;
            } else {
                this.currentRoom.y--;
                this.player.y = 0;
                this.changeRoom();
            }
        }

        if (this.player.x < 0) {
            if (this.currentRoom.x <= 0) {
                this.player.x = 0;
            } else {
                this.currentRoom.x--;
                this.player.x = this.config.bounds.width;
                this.changeRoom();
            }
        }

        if (this.player.x > this.config.bounds.width) {
            if (this.currentRoom.x >= this.config.mapSize.x) {
                this.player.x = this.config.bounds.width;
            } else {
                this.currentRoom.x++;
                this.player.x = 0;
                this.changeRoom();
            }
        }
    }

    checkCollisions() {
        // solids
        this.physics.collide(this.entities.solid, this.player);

        // breakeable rocks
        this.physics.collide(this.entities.rocks, this.player);
        this.physics.collide(this.entities.rocks, this.player.acid, (r: Rock, a: AcidParticle) => {
            r.hit();
            a.hit();
        })
        this.physics.overlap(this.entities.solid, this.entities.ballbugs, (s, b: BallBug) => {
            b.invert();
        })

    }

    checkHud() {
        this.antHud.update(this.player);
    }


}