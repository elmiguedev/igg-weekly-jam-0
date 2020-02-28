import * as Phaser from "phaser";
import Entity from "../core/entity";
import RedAnt from "./redant";

export default class Anthill extends Entity {

    // props
    // -------------------
    private antGenerationRate: number = 3000;
    private antsGroup: Phaser.Physics.Arcade.Group;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene, antsGroup: Phaser.Physics.Arcade.Group) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "tiles",
            frame: 5,
            immovable: true
        });
        this.antsGroup = antsGroup;
        this.init();
    }

    // game methods
    // -------------------

    init() {
        this.antGenerationRate = Phaser.Math.Between(1, 5) * 1000;
        setInterval(() => {
            this.generateAnt();
        }, this.antGenerationRate);
    }

    update() {

    }

    // methods
    // -------------------

    generateAnt() {
        const ant: RedAnt = this.antsGroup.getFirstDead();
        if (ant) {
            ant.revive();
            ant.setPosition(this.x, this.y);

            const mvx = Phaser.Math.Between(-40, 40);
            const mvy = Phaser.Math.Between(40, 60);
            const ax = -200 * (mvx > 0 ? 1 : -1);
            const ay = 200;
            ant.setMaxVelocity(mvx, mvy)
            ant.setAccelerationY(ay);
            ant.setAccelerationX(ax); // corroborar el signo
            ant.anims.play("red_ant_walk", true);
        }
    }

}