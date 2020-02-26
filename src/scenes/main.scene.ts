import * as Phaser from "phaser";
import Hud from "../entities/hud";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private ant: Phaser.GameObjects.Sprite;
    private keys: any;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer
    };

    private playerCamera:any;
    private hud:Hud;

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
    }

    createHud() {
        this.hud = new Hud(this);
        this.hud.addText("ant x",10,10);
        this.hud.addText("ant y",10,20);
    }

    createMap() {
        const map = this.make.tilemap({ key: "l_1" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        const background = map.createStaticLayer("background", tileset, 0, 0);

        this.mapLayers = {
            map: map,
            background: background
        }
    }

    configureCamera() {
        // this is a fix for tiles jitter
        this.playerCamera = new Phaser.Geom.Point(this.ant.x, this.ant.y);
        this.cameras.main.startFollow(this.playerCamera,true,0,1);
        this.cameras.main.setBounds(
            0,
            0,
            this.mapLayers.map.widthInPixels,
            this.mapLayers.map.heightInPixels
        );
    }

    createAnt() {
        this.anims.create({
            key: "ant_walk",
            frames: this.anims.generateFrameNames("ant", { start: 0, end: 2 }),
            frameRate: 20
        });
        const x = this.mapLayers.map.widthInPixels / 2;
        const y = this.mapLayers.map.heightInPixels - 8;
        this.ant = this.add.sprite(x, y, "ant", 1);

        this.cameras.main.startFollow(this.ant);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
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
       this.checkInput();
       this.checkCamera();
       this.checkDebugInfo();
    }

    checkInput() {
        if (this.keys.up.isDown) {
            this.ant.y -= 1;
            this.ant.anims.play("ant_walk", true);
        }
        if (this.keys.down.isDown) {
            this.ant.y += 1;
            this.ant.anims.play("ant_walk", true);

        }
        if (this.keys.left.isDown) {
            this.ant.x -= 1;
            this.ant.anims.play("ant_walk", true);

        }
        if (this.keys.right.isDown) {
            this.ant.x += 1;
            this.ant.anims.play("ant_walk", true);

        }
    }

    checkCamera() {
        this.playerCamera.x = Math.floor(this.ant.x);
        this.playerCamera.y = Math.floor(this.ant.y); 
    }

    checkDebugInfo() {
        this.hud.setValue("ant x",this.ant.x.toString());
        this.hud.setValue("ant y",this.ant.y.toString());
    }

}