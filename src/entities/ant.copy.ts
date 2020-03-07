import * as Phaser from "phaser";
import Entity from "../core/entity";
import AcidParticle from "./acid.particle";

export default class AntCopy extends Entity {

    // props
    // -------------------
    private acidLevelMax: number = 1000;
    private acidLevel: number = this.acidLevelMax;
    private life: number = 100;
    private maxVelocity: number = 50;
    private mudVelocity: number = 20;
    private acceleration: number = 300;
    public acid: Phaser.Physics.Arcade.Group;
    private acidRegenerationSpeed: number = 50;

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
        // this.setCollideWorldBounds(true);
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
            maxSize: 10,
            classType: AcidParticle
        });
        for (let i = 0; i < 10; i++) {
            const e = new AcidParticle(this.scene);
            this.acid.add(e);
            e.kill();
        }

        // create acid-regenerator
        setInterval(() => {
            if (this.acidLevel < this.acidLevelMax)
                this.acidLevel++;
        }, this.acidRegenerationSpeed);

    }

    walk() {
        this.scene.physics.velocityFromAngle(this.angle,50,this.body.velocity);
    }

    move(orientation: string) {
        switch (orientation) {
            case "left":
                this.setAngle(this.angle - 5);
                break;
            case "right":
                this.setAngle(this.angle + 5);
                break;
            case "up":
                this.walk();
                this.anims.play("ant_walk", true);
                break;
            case "down":
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
        const acid_particle: AcidParticle = this.acid.getFirstDead();
        if (acid_particle) {
            const angle = Phaser.Math.Between(this.angle-30, this.angle+30);
            
            acid_particle.setPosition(this.x, this.y);
            this.scene.physics.velocityFromAngle(angle,200,acid_particle.body.velocity);
            acid_particle.revive();
        }
    }

    private getVelocityYSign() {
        return this.body.velocity.y / Math.abs(this.body.velocity.y);
    }
    private getVelocityXSign() {
        return this.body.velocity.x / Math.abs(this.body.velocity.x);
    }

    slowDown() {

        this.setVelocity(0, 0);
    }

    hit() {
        this.life--;
        if (this.life <= 0) {
            this.kill();
        }
    }

    getAcidLevel() {
        return this.acidLevel;
    }

    getLife() {
        return this.life;
    }

}