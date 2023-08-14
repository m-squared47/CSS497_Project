"use strict";

class Spring{

    /*
    * Constructor
    * Params:
    * n1:     Node Object
    * n2:     Node Object
    * w:      Weight (thickness) of spring
    * ren:    Renderable object
    * double: Boolean if spring has a doubly accessed node (default = false)
    */
    constructor(n1, n2, w, ren, double = false) {
        this.mNode1 = n1;   // node 1
        this.mNode2 = n2;   // Node 2
        this.mPos1 = this.mNode1.getPosition();
        this.mPos2 = this.mNode2.getPosition();
        this.mLength = null;
        this.mWeight = w;   // Weight of spring (thickness)
        this.mRen = ren;    // Renderable
        this.xForm = this.mRen.getXform();
        this.mDouble = double;
        this.init();
    }

    init() {
        // set color
        this.mRen.setColor([1.0, 1.0, 1.0, 1.0]);

        // hook the renderable to both nodes

        // set the angle
        this.setAngle();

        // transform and get initial length
        this.mLength = this.getDistance();
        this.setTransform();

        // set position
        this.setPosition();
    }

    setTransform() {
        this.xForm.setSize(this.mWeight / 4, this.getDistance());
    }

    setPosition() {
        let midX = (this.mPos1.at(0) + this.mPos2.at(0)) / 2;
        let midY = (this.mPos1.at(1) + this.mPos2.at(1)) / 2;
        this.xForm.setPosition(midX, midY);
    }

    setAngle() {
        this.xForm.setRotationInRad(this.vectorsToAngle());
    }

    // Gets the angle between node1 and node2
    // @returns an angle in degrees
    vectorsToAngle() {
        let x1 = this.mPos1.at(0);
        let y1 = this.mPos1.at(1);
        let x2 = this.mPos2.at(0);
        let y2 = this.mPos2.at(1);

        return (Math.PI / 2) + Math.atan2(y2 - y1, x2 - x1);
    }

    // Get the distance between node1 and node2
    getDistance() {
        let diffX = this.mPos1.at(0) - this.mPos2.at(0);
        let diffY = this.mPos1.at(1) - this.mPos2.at(1);
        let distSq = Math.pow(diffX, 2) + (Math.pow(diffY, 2));
        return Math.sqrt(distSq);
    }

    // Setters
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

    // Getters
    getNode1() { return this.mNode1; }
    getNode2() { return this.mNode2; }

    // check if the spring should extend
    checkConstraint() {
        let diffX = this.mPos1.at(0) - this.mPos2.at(0);
        let diffY = this.mPos1.at(1) - this.mPos2.at(1);
        let diffLength = Math.sqrt(diffX * diffX + diffY * diffY);

        let diffFactor = (this.mLength - diffLength) / diffLength;
        let offset = vec2.fromValues(diffX * diffFactor * 0.5, diffY * diffFactor * 0.5);

        if (!this.mNode1.isPinned()) {
            // Calculate the new position of Node 1
            this.mPos1[0] += offset[0];
            this.mPos1[1] += offset[1];
            
            // Update the position of Node 1
            this.mNode1.updatePosition(this.mPos1);

        }

        if (!this.mNode2.isPinned()) {
            // Calculate the new position of Node 1
            this.mPos2[0] -= offset[0];
            this.mPos2[1] -= offset[1];
            
            // Update the position of Node 1
            this.mNode2.updatePosition(this.mPos2);

        }
    }


    draw(camera) {
        this.mNode1.draw(camera);
        this.mNode2.draw(camera);
        this.mRen.draw(camera);
    }

    update() {
        this.checkConstraint();
        
        // update nodes
        if (!this.mDouble) {
            this.mNode1.update();
            this.mNode2.update();
            this.mPos1 = this.mNode1.getPosition();
            this.mPos2 = this.mNode2.getPosition();
            //console.log("Double")
        }

        //change spring properties according to node positions
        this.setAngle();
        this.setPosition();
        this.setTransform();

    }
}

export default Spring;