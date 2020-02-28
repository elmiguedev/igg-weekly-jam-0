import * as Phaser from "phaser";

interface EntityConfig {
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    frame?: number,
    immovable?: boolean,
    anims?: Array<{
        key: string,
        start: number,
        end: number,
        repeat: boolean
    }>
}

export default class Entity extends Phaser.Physics.Arcade.Sprite {



    // properties 
    // ----------------------
    private config: EntityConfig;


    // constructor 
    // ----------------------

    constructor(config: EntityConfig) {
        super(config.scene, config.x, config.y, config.key);
        this.config = config;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this); // check
        this.configureEntity();

    }

    // methods 
    // ----------------------

    configureEntity() {

        // check if is immovable
        if (this.config.immovable) {
            this.body.immovable = true;
        }

        // check animations
        if (this.config.anims) {
            for (let i = 0; i < this.config.anims.length; i++) {
                const anim = this.config.anims[i];
                this.scene.anims.create({
                    key: anim.key,
                    repeat: (anim.repeat ? -1 : undefined),
                    frameRate: 10,
                    frames: this.scene.anims.generateFrameNumbers(
                        this.config.key,
                        {
                            start: anim.start,
                            end: anim.end
                        }
                    )
                });
            }

        }

    }

}