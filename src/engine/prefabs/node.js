"use strict";

import Transform from "../transform.js";
import GameObject from "../game_objects/game_object.js";
import Renderable from "../renderables/renderable.js";
// import physics

// extend game_object
class Node extends GameObject {

    constructor(renderable) {
        super(renderable);
        this.mRenderable = renderable;
        this.velocity = vec2.fromValues(0.0, 0.0);
        this.drag = 0.1;
        this.mass = 1.0;
        this.pinned = false;
        this.setVisibility(true);
    }

    updateMass(x)           {   this.mass = x; }
    updateDrag(d)           {   this.drag = d; }
    setPin(state)           {   this.pinned = state; }
    updatePosition(x, y)    {   this.getXform.setPosition(x, y); }

    getPosition()   {   return this.getXform.getPosition(); }
    getRenderable() {   return this.renderable; }
    getVelocity()   {   return this.velocity; }
    getDrag()       {   return this.drag; }
    getMass()       {   return this.mass; }
    isPinned()      {   return this.pinned; }

    update() {
        
    }

}

export default Node;