import * as Phaser from "phaser";
import Hud from "../core/hud";
import AntCopy from "./ant.copy";

export default class AntHud extends Hud{

    lifeBar: Phaser.GameObjects.Rectangle;
    acidBar: Phaser.GameObjects.Rectangle;

    constructor(scene:Phaser.Scene) {
        super(scene);
        this.createBars();
    }

    createBars() {
        
        this.lifeBar = this.mainScene.add.rectangle(10,10,10,4,0xff0000)
            .setOrigin(0)
            .setDepth(6);
        this.acidBar = this.mainScene.add.rectangle(10,16,10,4,0xffffff)
            .setOrigin(0)
            .setDepth(6);


        // this.lifeBar = this.mainScene.add.image(5,5,"tiles",27)
        //     .setDepth(6)
            
        //     .setScale(5,1)
        //     .setAlpha(0.5)
        //     .setOrigin(0);

        // this.lifeBar = this.mainScene.add.image(5,15,"tiles",28)
        //     .setDepth(6)
        //     .setScale(5,1)
        //     .setAlpha(0.5)
        //     .setOrigin(0);

    }

    update(ant:AntCopy) {

        this.lifeBar.setSize(ant.life / 10, 4);
        this.acidBar.setSize(ant.acidLevel / 10, 4);

        // this.setValue("acid",ant.getAcidLevel().toString());
        // this.setValue("life",ant.getLife().toString());
    }

}