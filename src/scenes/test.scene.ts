import * as Phaser from "phaser";


export default class MainScene extends Phaser.Scene {

    player: Phaser.Physics.Arcade.Sprite;
    cursors: any;
    map: Phaser.Tilemaps.Tilemap;
    layer: Phaser.Tilemaps.DynamicTilemapLayer;
    tileset: Phaser.Tilemaps.Tileset;
    currentRoom: number;
    text: Phaser.GameObjects.Text;

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
        }

        this.map = this.make.tilemap({ key: "test_all" });
        this.tileset = this.map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        this.layer = this.map.createDynamicLayer("00/b", this.tileset, 0, 0);
        this.currentRoom = 0;

        this.player = this.physics.add.sprite(10, 10, "red_ant", 0).setDepth(2);

        this.text = this.add.text(1, 1, "test").setDepth(3);
    }


    // changeMap() {
    //     console.log(this.currentRoom);
    //     this.map.destroy();
    //     this.layer.destroy();

    //     this.map = this.make.tilemap({ key: "test_" + this.currentRoom.toString() });
    //     this.layer = this.map.createStaticLayer("background", this.tileset, 0, 0).setDepth(1);

    // }

    changeMapAll() {
        const room = "0" + this.currentRoom.toString();
        const background = room + "/b";

        console.log(background);
        console.log(this.map.layers);

        // this.layer.destroy();
        // this.layer = this.map.createDynamicLayer(background, this.tileset, 0, 0);
        const l = this.map.getLayer(background);
        if (l.tilemapLayer) {
            this.layer.setVisible(false);
            this.layer = <Phaser.Tilemaps.DynamicTilemapLayer>l.tilemapLayer.setVisible(true);
        } else {
            this.layer = this.map.createDynamicLayer(background, this.tileset, 0, 0);
        }

    }



    update() {
        if (this.cursors.up.isDown) this.player.y -= 1;
        if (this.cursors.down.isDown) this.player.y += 1;
        if (this.cursors.left.isDown) this.player.x -= 1;
        if (this.cursors.right.isDown) this.player.x += 1;

        if (this.player.y < 0) {
            if (this.currentRoom >= 2) {
                this.player.y = 0;
            } else {
                this.currentRoom++;
                this.player.y = 96;
                this.changeMapAll();
            }
        }

        if (this.player.y > 96) {
            if (this.currentRoom <= 0) {
                this.player.y = 96;
            } else {
                this.currentRoom--;
                this.player.y = 0;
                this.changeMapAll();
            }
        }


    }



}