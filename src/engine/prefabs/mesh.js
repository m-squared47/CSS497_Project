"use strict";

import Node from "./node.js";
import Spring from "./spring.js";
import Renderable from "../renderables/renderable.js";
import GameObjectSet from "../game_objects/game_object_set.js";
class Mesh extends GameObjectSet{

    constructor(x, y, w, h, l, cam) {
        super();
        // these are temporary variables. Change later when fully implementing.
        this.x = x;     // x coord
        this.y = y;     // y coord
        this.w = w;     // width
        this.h = h;     // height
        this.l = l;     // node spacing
        this.mRenderset2 = null;
        this.generate();
    }

    // TO DO: Create a sufficient 2D array
    generateNodes(x, y) {
        for (let i = 0; i < this.w / this.l; i++) {
            var renderset2 = new GameObjectSet();

            for (let j = 0; j < this.h / this.l; j++) {
                var ren = new Renderable();
                ren.getXform().setPosition(x + (this.l * i), y + (this.l * j));
                ren.getXform().setSize(0.75, 0.75);
                ren.setColor([0, 0, 0, 1]);

                var node = new Node(ren);
                renderset2.addToSet(node);
            }

            this.addToSet(renderset2);
        }
    }

    generateSprings() {

    }

    generate() {
        var widthFromMid = this.w / 2;
        var heightFromMid = this.h / 2;
        var startX = this.x - widthFromMid;
        var startY = this.y - heightFromMid;

        this.generateNodes(startX, startY);
    }

    update() {

    }

}

export default Mesh;
