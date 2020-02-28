import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class RedAnt extends Entity {

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
            key: "red_ant",
            anims: [
                { key: "red_ant_walk", start: 0, end: 2, repeat: true },
            ],
        });

        this.init();
    }

    // game methods
    // -------------------

    init() {

        this.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;

    }

    update() {

    }

    // methods
    // -------------------


}