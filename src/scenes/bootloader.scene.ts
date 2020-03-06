import * as Phaser from "phaser";

export default class BootloaderScene extends Phaser.Scene {

    // properties
    // ----------------------

    // constructor
    // ----------------------


    constructor() {
        super({
            key: "BootloaderScene"
        })
    }

    // methods
    // ----------------------

    /**
     * Load all assets of the game
     */
    preload() {

        // load images
        this.load.image("acid", "../assets/img/acid.png");
        this.load.image("flower", "../assets/img/flower.png");
        this.load.image("trebol", "../assets/img/trebol.png");


        // load map_tiles
        this.load.image("map_tiles", "../assets/img/map_tiles.png");

        // load entities spritesheets
        this.load.spritesheet("ant", "../assets/img/ant_prototype.png", {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("red_ant", "../assets/img/redant_prototype.png", {
            frameWidth: 8,
            frameHeight: 8
        });
        this.load.spritesheet("rock", "../assets/img/rock_tiles.png", {
            frameWidth: 16,
            frameHeight: 16
        });


        // load map_tiles spritesheet for extra objects
        this.load.spritesheet("tiles", "../assets/img/map_tiles.png", {
            frameWidth: 8,
            frameHeight: 8
        });

        // load maps
        this.load.tilemapTiledJSON("test_1", "../assets/maps/test_1.json");
        this.load.tilemapTiledJSON("test_2", "../assets/maps/test_2.json");
        this.load.tilemapTiledJSON("test_3", "../assets/maps/test_3.json");
        this.load.tilemapTiledJSON("test_all", "../assets/maps/test_all.json");

        this.load.tilemapTiledJSON("l_1", "../assets/maps/l_1.json");

        // load fonts
        this.load.image("namco_font", "../assets/fonts/namco.png");


        // load everything
        this.load.on('complete', () => {
            this.scene.start('MainScene');
            // this.scene.start('TestScene');
        });

    }


}