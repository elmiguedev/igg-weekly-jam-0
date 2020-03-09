import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class BallBug extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "ballbug",
            anims: [
                { key: "ballbug_walk", start: 0, end: 2, repeat: true },
            ],
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.setOrigin(0, 1);
        this.anims.play("ballbug_walk", true);
        let velocity = Phaser.Math.Between(40, 80);
        this.setVelocityY(velocity);
    }

    invert() {
        this.setVelocityY(-this.body.velocity.y);
        this.setFlipY(!this.flipY)
    }

    update() {

    }

    // methods
    // -------------------



}