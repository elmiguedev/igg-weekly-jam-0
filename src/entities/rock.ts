import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Rock extends Entity {

    // props
    // -------------------
    private life: number = 100;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene,x:number, y:number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "rock",
            frame: 0,
            immovable: true
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.setOrigin(0,1);
    }

    update() {

    }

    // methods
    // -------------------

    hit() {
        if (this.life > 0) {
            this.life--;

            if (this.life < 100) this.setFrame(0);
            if (this.life < 75) this.setFrame(1);
            if (this.life < 50) this.setFrame(2);
            if (this.life < 25) this.setFrame(3);

        }
        else {
            this.destroy();
        }
    }

}