"use strict";

import GameObject from "../game_objects/game_object.js";
import Physics from "../physics/physics.js";

// extend game_object
class Node extends GameObject {

    constructor(renderable, collidables) {

        // GameObject and Renderable
        super(renderable);
        this.mRenderable = renderable;
        this.setVisibility(true);

        this.collidables = collidables;

        // timing variables
        this.mTime = performance.now();
        this.mPrevtime = this.mTime;
        this.dTime = null;

        // physics parameters
        let velocity = vec2.fromValues(1.0, 1.0);
        let drag = 0.7;
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
    updateGravity(grav)     {   this.mPhysics.setGravity(grav); }
    setPin(state)           {   this.pinned = state; }
    updatePosition(pos)     {   this.getXform().setPosition(pos.at(0), pos.at(1)); }
    incXPos(dX)             {   this.getXform().incXPosBy(dX); 
                                this.mPhysics.setPosition(this.getXform().getPosition()); }
    incYPos(dY)             {   this.getXform().incYPosBy(dY); 
                                this.mPhysics.setPosition(this.getXform().getPosition()); }

    getPosition()   {   return this.mRenderable.getXform().getPosition(); }
    getRenderable() {   return this.renderable; }
    getVelocity()   {   return this.mPhysics.getVelocity(); }
    getGravity()    {   return this.mPhysics.getGravity(); }
    getDrag()       {   return this.drag; }
    getMass()       {   return this.mass; }
    isPinned()      {   return this.pinned; }

    update() {

        for (let i = 0; i < this.collidables.length; i++) {
            var collidable = this.collidables[i];
            if (this.getBBox().intersectsBound(collidable.getBBox())) {
                this.mPhysics.setGravity(vec2.fromValues(0, 0));

                var pushSpeed = collidable.getSpeed();
                var pushDir = collidable.getCurrentFrontDir();

                if (pushDir[0] > 0) {
                    this.incXPos(pushSpeed);
                } 

                else if (pushDir[1] > 0) {
                    this.incYPos(pushSpeed);
                }

            }
        }

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