import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Flower extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "flower",
            immovable: true
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.setOrigin(0.5, 1);
        this.body.setSize(this.body.width - 12, this.body.height - 12, false);
        this.body.setOffset(6, 12)
    }

    update() {

    }

    // methods
    // -------------------



}