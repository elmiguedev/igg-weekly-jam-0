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

        this.load.image("square", "../assets/img/square.png");

        this.load.on('complete', () => {
            this.scene.start('MainScene');
        });

    }


}