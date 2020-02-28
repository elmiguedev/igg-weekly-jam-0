import * as Phaser from "phaser";
import Hud from "../core/hud";
import Ant from "./ant";

export default class AntHud extends Hud{

    constructor(scene:Phaser.Scene) {
        super(scene);
        this.addText("acid", 2,2);
        this.addText("life", 2,12);
    }

    update(ant:Ant) {
        this.setValue("acid",ant.getAcidLevel().toString());
        this.setValue("life",ant.getLife().toString());
    }

}