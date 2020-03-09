import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Powerup extends Entity {

    // props
    // -------------------
    type:string;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene,x:number,y:number, type:string) {
        super({
            scene: scene,
            x: x,
            y: y,
            key: "tiles",
            frame: 7,
            immovable: true
        });
        this.type=type;
        this.setType();
        this.init();
    }

    // game methods
    // -------------------

    setType() {
        switch (this.type) {
            case "acidPower":
                this.setFrame(24);
                break;
        
            case "acidLevel":
                this.setFrame(23);
                break;
        
            case "lifeLevel":
                this.setFrame(25);
                break;
        
            case "velocity":
                this.setFrame(26);
                break;
        
            default:
                break;
        }
    }

    init() {
        // this.setOrigin(0,1);
    }

    update() {

    }


    // methods
    // -------------------



}