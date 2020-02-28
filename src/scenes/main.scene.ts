import * as Phaser from "phaser";

import Ant from "../entities/ant";
import AntHud from "../entities/ant.hud";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private ant: Ant;
    private keys: any;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer,
        obstacles: Phaser.Tilemaps.StaticTilemapLayer,
        overlayer: Phaser.Tilemaps.StaticTilemapLayer,
    };

    private playerCamera: any;
    private hud: AntHud;

    // constructor 
    // ----------------------


    constructor() {
        super({
            key: "MainScene"
        })
    }

    // methods 
    // ----------------------

    init() {
        this.createMap();
        this.createKeys();
        this.createAnt();
        this.configureCamera();
        this.createHud();
        this.createCollisions();
    }

    createHud() {
        this.hud = new AntHud(this);
        this.hud.update(this.ant);
    }

    createMap() {
        const map = this.make.tilemap({ key: "l_1" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        const background = map.createStaticLayer("background", tileset, 0, 0);
        const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0).setDepth(5);
        const overlayer = map.createStaticLayer("overlayer", tileset, 0, 0).setDepth(10);


        this.mapLayers = {
            map: map,
            background: background,
            obstacles: obstacles,
            overlayer: overlayer,
        }
    }

    createCollisions() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.bounds.width = this.mapLayers.background.width;
        this.physics.world.bounds.height = this.mapLayers.background.height;
        this.mapLayers.obstacles.setCollisionByProperty({
            collides: true
        })
        this.physics.add.collider(this.ant, this.mapLayers.obstacles);
        this.physics.add.collider(this.ant.acid, this.mapLayers.obstacles, (a:Phaser.Physics.Arcade.Sprite,o) => {
            a.setActive(false).setVisible(false);
        })
    }

    configureCamera() {
        // this is a fix for tiles jitter
        this.playerCamera = new Phaser.Geom.Point(this.ant.x, this.ant.y);
        this.cameras.main.startFollow(this.playerCamera);
        this.cameras.main.setBounds(
            0,
            0,
            this.mapLayers.map.widthInPixels,
            this.mapLayers.map.heightInPixels
        );
    }

    createAnt() {

        // change with map checkpoint
        const x = this.mapLayers.map.widthInPixels / 2;
        const y = this.mapLayers.map.heightInPixels - 8;

        this.ant = new Ant(this);
        this.ant.setPosition(x, y);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            space: this.input.keyboard.addKey("space")
        }
    }

    createGrass() {
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(20, 300);
            const y = Phaser.Math.Between(20, 180);
            this.add.image(x, y, "grass");
        }
    }

    update() {
        this.checkCamera();
        this.checkInput();
        this.hud.update(this.ant);
        //    this.checkDebugInfo();
    }

    checkInput() {
        if (this.keys.up.isDown) {
            this.ant.move("up");
        } else if (this.keys.down.isDown) {
            this.ant.move("down");
        } else {
            this.ant.stop("vertical");
        }

        if (this.keys.left.isDown) {
            this.ant.move("left");
        } else if (this.keys.right.isDown) {
            this.ant.move("right");
        } else {
            this.ant.stop("horizontal");
        }

        if (this.keys.space.isDown) {
            this.ant.throwAcid();
            
        }
    }

    checkCamera() {
        this.playerCamera.x = Math.floor(this.ant.x);
        this.playerCamera.y = Math.floor(this.ant.y);
    }

    checkDebugInfo() {
        this.hud.setValue("ant x", this.ant.x.toString());
        this.hud.setValue("ant y", this.ant.y.toString());
    }

}