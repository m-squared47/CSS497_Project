"use strict";

import Transform from "../transform.js";
// import physics

// extend game_object
class Node{

    constructor(x, y) {
        this.xForm = new Transform();
        this.xForm.setPosition(x, y);
        this.velocity = vec2.fromValues(0.0, 0.0);
        this.drag = 0.1;
        this.mass = 1.0;
        this.pinned = false;
    }

    updateMass(x) {}

    updateDrag(d) {}

    getPosition() {}

    setPin(state) {}

    isPinned() {}

    draw(camera) {

    }

    update() {
        
    }

}