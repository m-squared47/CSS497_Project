"use strict";  // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../engine/game_objects/game_object.js";
import engine from "../engine/index.js";
import Renderable from "../engine/renderables/renderable.js";
import StartScene from "./my_game.js";


class ManyMesh extends engine.Scene {
    constructor() {
        super();
        // The camera to view the scene
        this.mCamera = null;

        this.mNode = null;

        this.mMesh = null;

        this.mCollidable = null;
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
        this.mCamera.setBackgroundColor([0.3, 0.3, 0.3, 1]);
        // sets the background to gray
        this.mMesh1 = new engine.Mesh(25, 25, 20, 20, 1, 0.5, 0);
        this.mMesh1.togglePinNode(0, 19);
        this.mMesh1.togglePinNode(10, 19);
        this.mMesh1.togglePinNode(19, 19);

        this.mMesh2 = new engine.Mesh(55, 45, 20, 60, 2, 0.5, 0);
        this.mMesh2.togglePinNode(0, 29);
        this.mMesh2.togglePinNode(5, 29);
        this.mMesh2.togglePinNode(9, 29);

        this.mMesh3 = new engine.Mesh(25, 50, 15, 15, 3, 0.5, 0);
        
        for (let i = 0; i < 15 / 3; i++) {
            this.mMesh3.togglePinNode(i, 4);
        }

        this.mMesh4 = new engine.Mesh(70, 25, 20, 40, 1, 0.5, 0);
        this.mMesh4.togglePinNode(0, 39);
        //this.mMesh4.togglePinNode(10, 39);
        this.mMesh4.togglePinNode(19, 39);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();

        this.mMesh1.draw(this.mCamera);
        this.mMesh2.draw(this.mCamera);
        this.mMesh3.draw(this.mCamera);
        this.mMesh4.draw(this.mCamera);
    }

    // The update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        // key input
        if (engine.input.isKeyClicked(engine.input.keys.A)) {
            this.next();
        }

        this.mMesh1.update();
        this.mMesh2.update();
        this.mMesh3.update();
        this.mMesh4.update();
    }

    next() {
        super.next();

        let nextScene = new StartScene();
        nextScene.start();
    }
        
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new ManyMesh();
    myGame.start();
}

export default ManyMesh;