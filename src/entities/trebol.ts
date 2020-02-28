import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Trebol extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "trebol",
            immovable: true
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.setOrigin(0.5, 1);
        this.body.setSize(8, 8, false);
        this.body.setOffset(8, 32)
    }

    update() {

    }

    // methods
    // -------------------



}