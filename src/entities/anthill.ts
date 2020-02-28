import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Anthill extends Entity {

    // props
    // -------------------
    private antGenerationRate: number = 100;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "tiles",
            frame: 5,
            immovable: true
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        // this.revive();
    }

    update() {

    }

    // methods
    // -------------------


}