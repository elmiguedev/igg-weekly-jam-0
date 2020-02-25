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

        this.load.spritesheet("ant", "../assets/img/ant_prototype.png", {
            frameWidth: 8,
            frameHeight: 8
        });

        this.load.image("grass", "../assets/img/grass_test.png")

        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });

    }


}