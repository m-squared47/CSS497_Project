"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";


class MyGame extends engine.Scene {
    constructor() {
        super();
        // The camera to view the scene
        this.mCamera = null;
    }

    load() {
    }

    unload() {

    }

    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(50, 37.5),   // position of the camera
            100,                       // width of camera
            [0, 0, 1280, 960]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();
    }

    // The update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {

    }
        
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}