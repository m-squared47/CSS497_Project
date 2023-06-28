"use strict";

class Physics{

    constructor(pos, vel, drag, mass){
        this.x = pos.x;
        this.y = pos.y;
        this.prevX = this.x;
        this.prevY = this.y;
        this.velocity = vel;
        this.prevVelocity = this.velocity;
        this.gravity = new vec2.fromValues(0, 9.8);
        this.drag = drag;
        this.mass = mass;
    }

    acceleration() {
        let acc = vec2.fromValues(0.0, 0.0);

        acc.x = this.gravity.x / this.mass;
        acc.y = this.gravity.y / this.mass;

        return acc;
    }

    verlet(dT) {
        let newPos = vec2.fromValues(0.0, 0.0);
        let acc = this.acceleration();

        newPos.x = (2 * this.x) - this.prevX + (acc.x * (dT * dT));
        newPos.y = (2 * this.y) - this.prevY + (acc.y * (dT * dT)); 

        console.log("Verlet Integration");
        console.log(newPos);
        this.setPosition(newPos);
    }

    getPosition() { return vec2.fromValues(this.x, this.y); }
    getVelocity() { return this.velocity; }
    getPrevPos() { return vec2.fromValues(this.prevX, this.prevY); }
    getPrevVel() { return this.prevVelocity; }

    setPosition(pos) { 
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = pos.x;
        this.y = pos.y;
    }
    updateMass(x)   {   this.mass = x; }
    updateDrag(d)   {   this.drag = d; }
    setGravity(gav) {   this.gravity = grav; }

}

export default Physics;