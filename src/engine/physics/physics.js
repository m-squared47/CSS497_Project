"use strict";

class Physics{

    constructor(pos, vel, drag, mass){
        this.currentPos = vec2.fromValues(pos.at(0), pos.at(1));
        this.prevPos = this.currentPos;
        this.velocity = vec2.fromValues(vel.at(0), vel.at(1));
        this.prevVelocity = this.velocity;
        this.gravity = new vec2.fromValues(0, -0.000098);
        this.gravityCoefficient = 1;
        this.drag = drag;
        this.mass = mass;
    }

    acceleration() {
        let accX = (this.gravity.at(0) * this.gravityCoefficient) / this.mass;
        let accY = (this.gravity.at(1) * this.gravityCoefficient) / this.mass;

        let acc = vec2.fromValues(accX, accY);

        return acc;
    }

    verlet(dT) {
        let acc = this.acceleration();
        let newX = this.currentPos.at(0) + 
                    (this.currentPos.at(0) - this.prevPos.at(0)) * (1 - this.drag) + 
                    acc.at(0) * (1 - this.drag) * (dT * dT);
        let newY = this.currentPos.at(1) + 
                    (this.currentPos.at(1) - this.prevPos.at(1)) * (1 - this.drag) + 
                    acc.at(1) * (1 - this.drag) * (dT * dT); 

        let newPos = vec2.fromValues(newX, newY);

        this.setPosition(newPos);
    }

    getPosition()   {   return vec2.fromValues(this.currentPos.at(0), this.currentPos.at(1)); }
    getVelocity()   {   return this.velocity; }
    getPrevPos()    {   return vec2.fromValues(this.prevX, this.prevY); }
    getPrevVel()    {   return this.prevVelocity; }
    getGravity()    {   return this.gravity; }

    setPosition(pos) { 
        this.prevPos = vec2.fromValues(this.currentPos.at(0), this.currentPos.at(1));
        this.currentPos = vec2.fromValues(pos.at(0), pos.at(1));
    }
    updateMass(x)               {   this.mass = x; }
    updateDrag(d)               {   this.drag = d; }
    updateVelocity(v)           {   this.velocity = vec2.fromValues(v[0], v[1]); }
    updateGravCoefficient(g)    {   this.gravityCoefficient = g; }
    setGravity(grav)            {   
        if (grav[0] < -0.000098) grav[0] = -0.000098;
        if (grav[0] > 0.000098) grav[0] = 0.000098;
        if (grav[1] < -0.000098) grav[1] = -0.000098;
        if (grav[1] > 0.000098) grav[1] = 0.000098;
        this.gravity = grav; 
    }

}

export default Physics;