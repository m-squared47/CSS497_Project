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
        this.mCamera = cam;
        this.generate();
    }

    // TO DO: Create a sufficient 2D array
    generateNodes(x, y) {
        console.log("entering");
        let node = null;
        for (let i = 0; i < (this.w / this.l); i++) {
            console.log("Column " + i);

            for (let j = 0; j < this.h / this.l; j++) {
                console.log("Row " + j);

                this.mRenderable = new Renderable();
                this.mRenderXform = this.mRenderable.getXform();
                this.mRenderXform.setPosition(x + (this.l * i), y + (this.l * j));
                this.mRenderXform.setSize(5, 5);
                this.mRenderable.setColor([0, 0, 0, 1]);

                node = new Node(this.mRenderable);
                this.addToSet(node);
            }
        }
        console.log("exiting");
    }

    generateSprings() {

    }

    generate() {
        // DEBUG: Show Midpoint
        this.mid = new Renderable(this.x, this.y);

        // determine the lowest x and y values for the starting node
        this.widthFromMid = this.w / 2;
        this.heightFromMid = this.h / 2;
        this.startingX = this.x - this.widthFromMid;
        this.startingY = this.y - this.heightFromMid;

        // 2D array to hold arrays of nodes
        console.log("Generating Nodes");
        this.generateNodes(this.startingX, this.startingY);
        console.log("Total Nodes: " + this.mSet.length);

        console.log("Generating Strings");

        this.addToSet(this.mid);
    }

    draw(camera) {
        
    }

    update() {

    }

}

export default Mesh;
