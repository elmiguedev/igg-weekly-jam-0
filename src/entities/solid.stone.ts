import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class SolidStone extends Entity {

    // props
    // -------------------

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene,x:number,y:number) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "tiles",
            frame: 7,
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



}