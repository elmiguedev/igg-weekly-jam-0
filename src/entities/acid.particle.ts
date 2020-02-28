import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class AcidParticle extends Entity {

    // props
    // -------------------
    private timer: any;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "acid",
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {
        
    }

    update() {

    }

    // methods
    // -------------------

    revive() {
        super.revive();
        this.timer = setTimeout(() => {
            this.kill();
        }, 200);
    }

    hit() {
        clearTimeout(this.timer);
        this.kill();
    }

    
}