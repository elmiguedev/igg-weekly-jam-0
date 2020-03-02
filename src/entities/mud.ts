import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Mud extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "tiles",
            frame: 6,
            immovable: true
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.setDepth(5)
    }

    update() {

    }

    // methods
    // -------------------



}