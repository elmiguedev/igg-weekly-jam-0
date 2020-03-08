import * as Phaser from "phaser";
import Ant from "../entities/ant";
import AntCopy from "../entities/ant.copy";

export default class MainScene extends Phaser.Scene {

    player: AntCopy;
    cursors: any;
    map: Phaser.Tilemaps.Tilemap;
    layer: Phaser.Tilemaps.DynamicTilemapLayer;
    tileset: Phaser.Tilemaps.Tileset;
    roomx: number;
    roomy: number;
    text: Phaser.GameObjects.Text;
    backgroundText: Phaser.GameObjects.Text;

    constructor() {
        super({
            key: "TestScene"
        });
    }

    init() {
        this.cursors = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            fire: this.input.keyboard.addKey("space"),
        }

        this.map = this.make.tilemap({ key: "maps" });
        this.tileset = this.map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);

        this.roomx = 0;
        this.roomy = 0;

        
        this.player = new AntCopy(this);
        this.player.setPosition(30,30);
        
        this.text = this.add.text(1, 1, `rooms: ${this.roomx}, ${this.roomy}`).setDepth(3);
        this.backgroundText= this.add.text(1, 12, `background:`).setDepth(3);
        this.changeMapAll();
    }


    // changeMap() {
    //     console.log(this.currentRoom);
    //     this.map.destroy();
    //     this.layer.destroy();

    //     this.map = this.make.tilemap({ key: "test_" + this.currentRoom.toString() });
    //     this.layer = this.map.createStaticLayer("background", this.tileset, 0, 0).setDepth(1);

    // }

    changeMapAll() {
        const roomx = this.roomx.toString();
        const roomy = this.roomy.toString();
        const background = roomx + roomy + "/b";
        const objects = roomx + roomy + "/o";
        
        this.text.setText(`rooms: ${this.roomx}, ${this.roomy}`);
        this.backgroundText.setText(`bg: ${background}`);

        if (this.layer) {
            this.layer.destroy(false);
        }
        this.layer = this.map.createDynamicLayer(background, this.tileset, 0, 0);
        // const l = this.map.getLayer(background);
        // console.log(l.tilemapLayer);
        // if (l.tilemapLayer) {
        //     const old = this.layer;
        //     old.destroy(false);
        //     this.layer = <Phaser.Tilemaps.DynamicTilemapLayer>l.tilemapLayer;
        //     this.layer.setVisible(true).setActive(true);
        // } else {
        //     this.layer = this.map.createDynamicLayer(background, this.tileset, 0, 0);
        // }

    }



    update() {
        if (this.cursors.up.isDown) this.player.move("up");
        if (this.cursors.down.isDown) this.player.move("down");
        if (this.cursors.left.isDown) this.player.move("left");
        if (this.cursors.right.isDown) this.player.move("right");
        if (this.cursors.fire.isDown) this.player.throwAcid();


        if (this.player.y < 0) {
            if (this.roomy >= 4) {
                this.player.y = 0;
            } else {
                this.roomy++;
                this.player.y = 96;
                this.changeMapAll();
            }
        }

        if (this.player.y > 96) {
            if (this.roomy <= 0) {
                this.player.y = 96;
            } else {
                this.roomy--;
                this.player.y = 0;
                this.changeMapAll();
            }
        }

        if (this.player.x < 0) {
            if (this.roomx <= 0) {
                this.player.x = 0;
            } else {
                this.roomx--;
                this.player.x = 128;
                this.changeMapAll();
            }
        }

        if (this.player.x > 128) {
            if (this.roomx >= 4) {
                this.player.x = 128;
            } else {
                this.roomx++;
                this.player.x = 0;
                this.changeMapAll();
            }
        }


    }



}