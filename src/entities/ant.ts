import * as Phaser from "phaser";
import Entity from "../core/entity";

export default class Ant extends Entity {

    // props
    // -------------------
    private acidLevel: number = 100;
    private life: number = 100;
    private maxVelocity: number = 50;
    private acceleration: number = 300;
    public acidGenerator: Phaser.GameObjects.Particles.ParticleEmitterManager;

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
        // crate emiter
        // this.acidGenerator = this.scene.add.particles("acid");
        this.acidGenerator = this.scene.add.particles("acid");
        this.acidGenerator.createEmitter({
            speed: 20,
            accelerationY: -600,
            accelerationX: { min: -300, max: 300 },
            angle: { min: -85, max: -95 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 200, max: 400 },
            blendMode: 'ADD',
            frequency: 110,
            maxParticles: 100,
        });
        // this.scene.add.existing(this.acidGenerator);
        // this.scene.physics.world.enable(this.acidGenerator);




        // create acid-regenerator
        setInterval(() => {
            if (this.acidLevel < 100)
                this.acidLevel++;
        }, 300);


        this.acid = this.scene.physics.add.group({
            maxSize: 20,
            key: "acid"
        });

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

    public acid: Phaser.Physics.Arcade.Group;

    throwAcid() {
        if (this.acidLevel > 0) {
            this.acidLevel--;
            // this.acidGenerator.emitParticleAt(this.x, this.y - 8);
            // this.acidGenerator.emitters.first
            const acid_particle: Phaser.Physics.Arcade.Image = this.acid.create();
            acid_particle.setAccelerationY(-600);
            acid_particle.setActive(true).setVisible(true);


        }
    }


}