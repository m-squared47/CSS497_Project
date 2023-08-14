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
        let velocity = vec2.fromValues(1.0, 1.0);
        let drag = 0.47;
        let mass = 1.0;
        this.pinned = false;

        this.currPos = this.getXform().getPosition();
        this.prevPos = this.getXform().getPosition();
        
        // Physics
        this.mPhysics = new Physics(this.currPos, velocity, drag, mass);
    }

    updateMass(x)           {   this.mPhysics.updateMass(x); }
    updateDrag(d)           {   this.mPhysics.updateDrag(d); }
    updateVelocity(v)       {   this.mPhysics.updateVelocity(v); }
    updateGravCoefficient(g){   this.mPhysics.setGravCoefficient(g); }
    setPin(state)           {   this.pinned = state; }
    updatePosition(pos)     {   this.getXform().setPosition(pos.at(0), pos.at(1)); }
    incXPos(dX)             {   this.getXform().incXPosBy(dX); }
    incYPos(dY)             {   this.getXform().incYPosBy(dY); }

    getPosition()   {   return this.mRenderable.getXform().getPosition(); }
    getRenderable() {   return this.renderable; }
    getVelocity()   {   return this.mPhysics.getVelocity(); }
    getGravity()    {   return this.mPhysics.getGravity(); }
    getDrag()       {   return this.drag; }
    getMass()       {   return this.mass; }
    isPinned()      {   return this.pinned; }

    update() {

        this.mPrevTime = this.mTime;
        this.mTime = performance.now();
        this.dTime = this.mTime - this.mPrevTime;

        if (this.pinned) {
            this.currPos = this.prevPos;
        } else {
            // refresh current position for verlet integration
            this.mPhysics.verlet(this.dTime);
            let updatePos = this.mPhysics.getPosition();

            // check window collision
            if (updatePos.at(1) <= 0) {
                updatePos = vec2.fromValues(updatePos.at(0), 0);
            }

            // check spring tension
            this.prevPos = this.currPos;
            this.curPos = updatePos;
            this.getXform().setPosition(updatePos.at(0), updatePos.at(1));
        }
    }

}

export default Node;