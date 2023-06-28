"use strict";

import GameObject from "../game_objects/game_object.js";
import Physics from "../physics/physics.js";

// extend game_object
class Node extends GameObject {

    constructor(renderable) {

        // GameObject and Renderable
        super(renderable);
        this.mRenderable = renderable;
        this.setVisibility(true);

        // timing variables
        this.mTime = performance.now();
        this.mPrevtime = this.mTime;
        this.dTime = null;

        // physics parameters
        let velocity = vec2.fromValues(0.0, 0.0);
        let drag = 0.1;
        let mass = 1.0;
        this.pinned = false;
        
        // Physics
        this.mPhysics = new Physics(this.getPosition, velocity, drag, mass);
    }

    updateMass(x)           {   this.mPhysics.updateMass(x); }
    updateDrag(d)           {   this.mPhysics.updateDrag(d); }
    setPin(state)           {   this.pinned = state; }
    updatePosition(pos)    {   this.getXform.setPosition(pos); }

    getPosition()   {   return this.getXform.getPosition(); }
    getRenderable() {   return this.renderable; }
    getVelocity()   {   return this.velocity; }
    getDrag()       {   return this.drag; }
    getMass()       {   return this.mass; }
    isPinned()      {   return this.pinned; }

    update() {
        this.mPrevTime = this.mTime;
        this.mTime = performance.now();
        this.dTime = this.mTime - this.mPrevTime;
        console.log(this.dTime);

        // refresh current position for verlet integration
        this.mPhysics.verlet(this.dTime);
        this.getXform().setPosition(this.mPhysics.getPosition());
    }

}

export default Node;