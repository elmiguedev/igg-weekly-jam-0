import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Ant extends Entity {

    // props
    // -------------------
    private acidLevel: number = 100;
    private life: number = 100;
    private maxVelocity: number = 50;
    private acceleration: number = 300;
    public acid: Phaser.Physics.Arcade.Group;
    private acidRegenerationSpeed:number = 200;

    // constructor
    // -------------------

    constructor(scene: Phaser.Scene) {
        super({
            scene: scene,
            x: 0,
            y: 0,
            key: "ant",
            anims: [
                { key: "ant_walk", start: 0, end: 2, repeat: false },
            ]
        });
        this.init();
    }

    // game methods
    // -------------------

    init() {

        // ant properties
        this.setCollideWorldBounds(true);
        this.setDepth(5);
        this.setDrag(500, 500)
        this.setMaxVelocity(this.maxVelocity, this.maxVelocity);

        this.createAcidGenerator();
    }

    update() {

    }

    // methods
    // -------------------

    createAcidGenerator() {

        // create acid particles group
        this.acid = this.scene.physics.add.group({
            maxSize: 20,
            key: "acid"
        });
        for (let i = 0; i < 20; i++) {
            const e = this.scene.physics.add.sprite(0, 0, "acid");
            e.setActive(false).setVisible(false);
            this.acid.add(e);
        }

        // create acid-regenerator
        setInterval(() => {
            if (this.acidLevel < 100)
                this.acidLevel++;
        }, this.acidRegenerationSpeed);

    }


    move(orientation: string) {
        switch (orientation) {
            case "left":
                this.setAccelerationX(-this.acceleration);
                this.anims.play("ant_walk", true);
                break;
            case "right":
                this.setAccelerationX(this.acceleration);
                this.anims.play("ant_walk", true);
                break;
            case "up":
                this.setAccelerationY(-this.acceleration);
                this.anims.play("ant_walk", true);
                break;
            case "down":
                this.setAccelerationY(this.acceleration);
                this.anims.play("ant_walk", true);
                break;
            default:
                break;
        }
    }
    stop(direction: string) {
        switch (direction) {
            case "horizontal":
                this.setAccelerationX(0);
                break;
            case "vertical":
                this.setAccelerationY(0);
                break;
            default:
                this.setAccelerationY(0);
                this.setAccelerationX(0);
                break;
        }
    }

    throwAcid() {
        if (this.acidLevel > 0) {
            this.acidLevel--;
            this.createAcidParticle();
        }
    }

    private createAcidParticle() {
        const acid_particle = this.acid.getFirstDead();
        if (acid_particle) {
            acid_particle.setPosition(this.x, this.y-6);
            acid_particle.setVelocityY(-200);
            acid_particle.setVelocityX(Phaser.Math.Between(-100, 100));
            acid_particle.setActive(true).setVisible(true);
            setTimeout(() => {
                acid_particle.setActive(false).setVisible(false);
            }, 200);
        }
    }


}