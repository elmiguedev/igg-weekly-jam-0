import * as Phaser from "phaser";

import AntCopy from "../entities/ant.copy";
import AntHud from "../entities/ant.hud";
import Rock from "../entities/rock";
import AcidParticle from "../entities/acid.particle";
import Anthill from "../entities/anthill";
import RedAnt from "../entities/redant";
import Flower from "../entities/flower";
import Trebol from "../entities/trebol";
import Mud from "../entities/mud";

export default class MainScene extends Phaser.Scene {

    // properties 
    // ----------------------

    private ant: AntCopy;
    private keys: any;
    private mapLayers: {
        map: Phaser.Tilemaps.Tilemap,
        background: Phaser.Tilemaps.StaticTilemapLayer,
        objects: Phaser.Tilemaps.ObjectLayer,
    };

    private playerCamera: any;
    private hud: AntHud;
    private rocks: Phaser.Physics.Arcade.Group;
    private redAntsGroup: Phaser.Physics.Arcade.Group;
    private obstaclesGroup: Phaser.Physics.Arcade.Group;
    private mudGroup: Phaser.Physics.Arcade.Group;

    // constructor 
    // ----------------------


    constructor() {
        super({
            key: "MainScene"
        })
    }

    // methods 
    // ----------------------

    init() {
        this.createMap();
        this.createKeys();
        this.createAnt();
        this.configureCamera();
        this.createHud();

        this.createRocks();
        this.createAnthills();
        this.createObstacles();

        this.createCollisions();
    }

    createHud() {
        this.hud = new AntHud(this);
        this.hud.update(this.ant);
    }

    createMap() {
        const map = this.make.tilemap({ key: "l_1" });
        const tileset = map.addTilesetImage("map_tiles", "map_tiles", 8, 8, 0, 0);
        const background = map.createStaticLayer("background", tileset, 0, 0);
        // const obstacles = map.createStaticLayer("obstacles", tileset, 0, 0).setDepth(5);
        // const overlayer = map.createStaticLayer("overlayer", tileset, 0, 0).setDepth(10);
        const objects = map.getObjectLayer("objects");


        this.mapLayers = {
            map: map,
            background: background,
            objects: objects
        }
    }

    createCollisions() {
        this.physics.world.setBoundsCollision(true, true, true, true);
        this.physics.world.bounds.width = this.mapLayers.background.width;
        this.physics.world.bounds.height = this.mapLayers.background.height;

        this.physics.add.collider(this.ant, this.obstaclesGroup);
        this.physics.add.collider(this.ant.acid, this.obstaclesGroup, (a: AcidParticle, o) => {
            a.hit();
        })

        this.physics.add.collider(this.ant, this.rocks);
        this.physics.add.collider(this.ant.acid, this.rocks, (a: AcidParticle, r: Rock) => {
            a.hit();
            r.hit();
        })

        this.physics.add.collider(this.redAntsGroup, this.obstaclesGroup, (a: RedAnt, o) => {
            a.sideStep();
        });
        this.physics.add.collider(this.redAntsGroup, this.ant.acid, (a: RedAnt, c: AcidParticle) => {
            a.hit();
            c.hit();
        });

        this.physics.add.collider(this.ant, this.redAntsGroup, (a: AntCopy, r: RedAnt) => {
            r.sideStep();
            r.hit();
            a.hit();

        })

        this.physics.add.overlap(this.ant, this.mudGroup, (a: AntCopy, m: Mud) => {
            a.slowDown();
        })

        this.physics.world.on('worldbounds', (body) => {
            if (body.gameObject instanceof RedAnt) {
                body.gameObject.kill();
            }
        });

    }


    configureCamera() {
        // this is a fix for tiles jitter
        this.playerCamera = new Phaser.Geom.Point(this.ant.x, this.ant.y);
        this.cameras.main.startFollow(this.playerCamera);
        this.cameras.main.setBounds(
            0,
            0,
            this.mapLayers.map.widthInPixels,
            this.mapLayers.map.heightInPixels
        );
    }

    createAnt() {

        // change with map checkpoint
        const x = this.mapLayers.map.widthInPixels / 2;
        const y = this.mapLayers.map.heightInPixels - 8;

        this.ant = new AntCopy(this);
        this.ant.setPosition(x, y);
    }

    createKeys() {
        this.keys = {
            up: this.input.keyboard.addKey("up"),
            down: this.input.keyboard.addKey("down"),
            left: this.input.keyboard.addKey("left"),
            right: this.input.keyboard.addKey("right"),
            space: this.input.keyboard.addKey("space")
        }
    }

    createGrass() {
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(20, 300);
            const y = Phaser.Math.Between(20, 180);
            this.add.image(x, y, "grass");
        }
    }

    createMud() {
        
    }

    createRocks() {
        this.rocks = this.physics.add.group({
            maxSize: 20,
            classType: Rock,
            immovable: true
        });
        // r.setImmovable(true);
        const r1 = new Rock(this).setVisible(true).setActive(true).setPosition(20, 740);
        const r2 = new Rock(this).setVisible(true).setActive(true).setPosition(30, 740);
        const r3 = new Rock(this).setVisible(true).setActive(true).setPosition(25, 750);

        this.rocks.addMultiple([r1, r2, r3]);
    }

    createAnthills() {
        this.redAntsGroup = this.physics.add.group({
            classType: RedAnt,
            maxSize: 50,
            collideWorldBounds: true
        });
        for (let i = 0; i < 50; i++) {
            const a = new RedAnt(this);
            a.kill();
            this.redAntsGroup.add(a);
        }
        const anthillsTiles = this.mapLayers.objects.objects.filter(o => o.type == "anthill");
        for (let i = 0; i < anthillsTiles.length; i++) {
            const a = new Anthill(this, this.redAntsGroup);
            a.setPosition(anthillsTiles[i].x, anthillsTiles[i].y);
        }

    }

    createObstacles() {
        // create mud group
        this.mudGroup = this.physics.add.group({ classType: Mud, immovable: true });
        // create obstacles group
        this.obstaclesGroup = this.physics.add.group({ immovable: true });

        // iterates all objects
        for (let i = 0; i < this.mapLayers.objects.objects.length; i++) {
            const o = this.mapLayers.objects.objects[i];
            switch (o.type) {
                case "flower":
                    const f = new Flower(this);
                    f.setPosition(o.x, o.y);
                    f.setDepth(10);
                    this.obstaclesGroup.add(f);
                    break;

                case "trebol":
                    const t = new Trebol(this);
                    t.setPosition(o.x, o.y);
                    t.setDepth(10);
                    this.obstaclesGroup.add(t);
                    break;

                case "mud":
                    const m = new Mud(this);
                    m.setPosition(o.x, o.y);
                    m.setDepth(0);

                    this.mudGroup.add(m);
                    break;

                default:
                    break;
            }
        }
    }

    // update methods
    // -----------------------------


    update() {
        this.checkCamera();
        this.checkInput();
        this.hud.update(this.ant);
        //    this.checkDebugInfo();
    }

    checkInput() {
        

        if (this.keys.left.isDown) {
            this.ant.move("left");
        } else if (this.keys.right.isDown) {
            this.ant.move("right");
        } else {
            this.ant.stop("horizontal");
        }

        if (this.keys.up.isDown) {
            this.ant.move("up");
        } else if (this.keys.down.isDown) {
            this.ant.move("down");
        } else {
            this.ant.stop("vertical");
        }

        if (this.keys.space.isDown) {
            this.ant.throwAcid();

        }
    }

    checkCamera() {
        this.playerCamera.x = Math.floor(this.ant.x);
        this.playerCamera.y = Math.floor(this.ant.y);
    }

    checkDebugInfo() {
        this.hud.setValue("ant x", this.ant.x.toString());
        this.hud.setValue("ant y", this.ant.y.toString());
    }

}