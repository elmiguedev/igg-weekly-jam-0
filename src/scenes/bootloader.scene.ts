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

        // load map_tiles
        this.load.image("map_tiles", "../assets/img/map_tiles.png");

        // load char spritesheet
        this.load.spritesheet("ant", "../assets/img/ant_prototype.png", {
            frameWidth: 8,
            frameHeight: 8
        });

        // load map_tiles spritesheet for extra objects
        this.load.spritesheet("tiles", "../assets/img/tiles.png", {
            frameWidth: 8,
            frameHeight: 8
        });

        // load maps
        this.load.tilemapTiledJSON("l_1", "../assets/maps/l_1.json");

        // load fonts
        this.load.image("namco_font","../assets/fonts/namco.png");
        

        // load everything
        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });

    }


}