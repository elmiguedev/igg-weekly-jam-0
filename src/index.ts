import * as Phaser from "phaser";
import BootloaderScene from "./scenes/bootloader.scene";
import MainScene from "./scenes/main.scene";

class Game {

    // properties 
    // ----------------------

    private game: Phaser.Game;
    private config: Phaser.Types.Core.GameConfig;

    // constructor 
    // ----------------------

    constructor() {

        // create game configuration
        this.config = {
            type: Phaser.AUTO,

            width: 320,
            height: 200,
            render: {
                pixelArt: true,
            },

            physics: {
                default: "arcade",
                arcade: {
                    // gravity: { x: 0, y: 300 }

                }
            },
        };

        // set the configuration to a new game instance
        this.game = new Phaser.Game(this.config);

        // add all needed scenes
        this.addScenes();

        // start bootloader
        this.game.scene.start("BootloaderScene");
    }

    // methods 
    // ----------------------

    private addScenes(): void {
        this.game.scene.add("BootloaderScene", BootloaderScene);
        this.game.scene.add("MainScene", MainScene);
        // this.game.scene.add("HudScene", HudScene);
    }

}

// Main function call
// -------------------

window.onload = () => {
    const game: Game = new Game();
};
