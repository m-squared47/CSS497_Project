"use strict";

class Spring{

    constructor(n1, n2, w, ren) {
        this.mNode1 = n1;   // node 1
        this.mNode2 = n2;   // Node 2
        this.mPos1 = this.mNode1.getPosition();
        this.mPos2 = this.mNode2.getPosition();
        this.mWeight = w;   // Weight of spring (thickness)
        this.mRen = ren;    // Renderable
        this.init();
    }

    init() {
        // set color
        this.mRen.setColor([1.0, 1.0, 1.0, 1.0]);

        // hook the renderable to both nodes
        let xForm = this.mRen.getXform();

        // set the angle
        let angle = 0;

        if (this.mPos1.at(0) == this.mPos2.at(0))
            angle = 0;
        else if (this.mPos1.at(1) == this.mPos2.at(1))
            angle = Math.PI / 2;
        else
            angle = this.vectorsToAngle();

        xForm.setRotationInRad(angle);
        console.log("Angle = " + angle);

        // get the length
        let distance = this.getDistance();

        // transform
        xForm.setSize(this.mWeight / 4, distance);

        // set position
        let midX = (this.mPos1.at(0) + this.mPos2.at(0)) / 2;
        let midY = (this.mPos1.at(1) + this.mPos2.at(1)) / 2;
        xForm.setPosition(midX, midY);
    }

    // Gets the angle between node1 and node2
    // @returns an angle in degrees
    vectorsToAngle() {
        let a = vec2.fromValues(0, 0);
        let b = vec2.fromValues(Math.abs(this.mPos1.at(0) - this.mPos2.at(0)), Math.abs(this.mPos1.at(1) - this.mPos2.at(1)));
        let ab = (a.at(0) * b.at(0)) + (a.at(1) * b.at(1));
        let magA = Math.sqrt(Math.pow(a.at(0), 2) + Math.pow(a.at(1), 2));
        let magB = Math.sqrt(Math.pow(b.at(0), 2) + Math.pow(b.at(1), 2));

        let cos_theta = ab / (magA * magB);
        return Math.acos(cos_theta);
    }

    // Get the distance between node1 and node2
    getDistance() {
        let diffX = this.mPos1.at(0) - this.mPos2.at(0);
        let diffY = this.mPos1.at(1) - this.mPos2.at(1);
        let distSq = Math.pow(diffX, 2) + (Math.pow(diffY, 2));
        return Math.sqrt(distSq);
    }

    updateElasticity(x) {}

    updateWeight(w) {}

    setNodes(n1, n2) {
        this.mNode1 = n1;   // node 1
        this.mNode2 = n2;   // Node 2
        this.mPos1 = this.mNode1.getPosition();
        this.mPos2 = this.mNode2.getPosition();
    }

    setNode1(n1) {
        this.mNode1 = n1;   // node 1
        this.mPos1 = this.mNode1.getPosition();
    }
    setNode2(n2) {
        this.mNode2 = n2;   // Node 2
        this.mPos2 = this.mNode2.getPosition();
    }

    getNode1() { return this.mNode1; }
    getNode2() { return this.mNode2; }

    draw(camera) {
        this.mNode1.draw(camera);
        this.mNode2.draw(camera);
        this.mRen.draw(camera);
    }

    update() {
        console.log("Update Spring");
        this.mNode1.update();
        this.mNode2.update();

        this.mPos1 = this.mNode1.getPosition();
        this.mPos2 = this.mNode2.getPosition();
    }
}

export default Spring;