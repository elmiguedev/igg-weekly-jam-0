import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class RedAnt extends Entity {

    // props
    // -------------------
    private life: number = 100;

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

        this.life = 50;
        this.setCollideWorldBounds(true);
        this.setDepth(1);
        // @ts-ignore
        this.body.onWorldBounds = true;
    }

    update() {

    }

    // methods
    // -------------------

    sideStep() {
        this.setX(this.x + (0.5 * (this.body.velocity.x > 0 ? 1 : -1))) // esto hace que corrija posicion
    }

    hit() {
        this.life--;
        this.setVelocityY(0);
        if (this.life <= 0) {
            this.kill();
        }
    }

}