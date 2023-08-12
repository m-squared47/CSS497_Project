"use strict";

import Node from "./node.js";
import Spring from "./spring.js";
import Renderable from "../renderables/renderable.js";
import GameObjectSet from "../game_objects/game_object_set.js";
class Mesh extends GameObjectSet{

    constructor(x, y, w, h, l, s) {
        super();
        // these are temporary variables. Change later when fully implementing.
        this.x = x;     // x coord
        this.y = y;     // y coord
        this.w = w;     // width
        this.h = h;     // height
        this.l = l;     // node spacing
        this.s = s;     // spring weight (thickness)
        this.mNodeArray = [];

        this.nodeArray = [];
        this.springArray = [];

        this.generate();

        // for performance data
        this.mTime = performance.now();
        this.mPrevTime = this.mTime;
    }

    // TO DO: Create a sufficient 2D array
    generateNodes(x, y) {
        this.mNodeArray = [new GameObjectSet()];

        for (let i = 0; i < this.w / this.l; i++) {
            var nodeCol = new GameObjectSet();

            for (let j = 0; j < this.h / this.l; j++) {
                var ren = new Renderable();
                ren.getXform().setPosition(x + (this.l * i), y + (this.l * j));
                ren.getXform().setSize(0.75, 0.75);
                ren.setColor([0, 0, 0, 1]);

                var node = new Node(ren);

                // TEMP: Remove when more functionality allows
                // pin nodes (top left and top right)
                if ((i == 0 & j + 1 == this.h / this.l) || (i + 1 == this.w / this.l & j + 1 == this.h / this.l)) {
                   node.setPin(true);
                }

                // TEMP: Pin all nodes
                //node.setPin(true);

                nodeCol.addToSet(node);
            }

            this.mNodeArray.addToSet(nodeCol);
        }
    }

    generateSprings() {
        // Array for spring objects
        this.springArray = new GameObjectSet();

        for (let i = 0; (i + 1) <= this.h / this.l; i++) {

            let nodeCol = this.mNodeArray.getObjectAt(i);

            let nextNodeCol = null;

            if (i + 1 < this.h / this.l) {
             nextNodeCol = this.mNodeArray.getObjectAt(i + 1);
            }

            for (let j = 0; (j + 1) <= nodeCol.size(); j++) {

                // get selected node
                let currNode = nodeCol.getObjectAt(j);

                // get neighboring nodes
                // to avoid duplicate objects, only allow creation of
                // 1-2 springs at a time
                let neighbor1 = null;
                if (nextNodeCol != null)
                    neighbor1 = nextNodeCol.getObjectAt(j);

                let neighbor2 = nodeCol.getObjectAt(j + 1);

                // create springs
                // renderable for first spring
                var ren = new Renderable();

                //console.log("Spring 1: " + i + " , " + j);
                if (neighbor1 != null) {
                    var spring1 = new Spring(currNode, neighbor1, this.s, ren);
                    this.springArray.addToSet(spring1);
                }

                // renderable for second spring
                var ren = new Renderable();
                ren.setColor([0.5, 0.5, 0.5, 1]);

                //console.log("Spring 2: " + i + " , " + j);
                if (neighbor2 != null) {
                    var spring2 = new Spring(currNode, neighbor2, this.s, ren);
                    this.springArray.addToSet(spring2);
                }
            }
        }

        this.clear();
        
        for (let f = 0; f < this.springArray.size(); f++) {
            this.addToSet(this.springArray.getObjectAt(f));
        }

        //console.log("# of springs: " + this.size());
    }

    generate() {
        var widthFromMid = this.w / 2;
        var heightFromMid = this.h / 2;
        var startX = this.x - widthFromMid;
        var startY = this.y - heightFromMid;

        this.generateNodes(startX, startY);
        this.generateSprings();
    }

    update() {
        // TODO: Create a more efficient storage system for nodes for efficient
        //          traversal and neighbor assignments

        console.log("Update Mesh");
        for (let i = 0; i < this.mSet.length; i++) {
            this.getObjectAt(i).update;
        }

        this.mTime = performance.now();
        //console.log(this.mTime - this.mPrevTime);
        this.mPrevTime = this.mTime;
    }

}

export default Mesh;
