"use strict";  // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../engine/game_objects/game_object.js";
import engine from "../engine/index.js";
import Renderable from "../engine/renderables/renderable.js";
import CollideScene from "./collide_scene.js";


class StartScene extends engine.Scene {
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
        this.mMesh = new engine.Mesh(50, 50, 50, 50, 2, 1, 0);
        this.mMesh.togglePinNode(0, 24);
        this.mMesh.togglePinNode(12, 24);
        this.mMesh.togglePinNode(24, 24);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();

        this.mMesh.draw(this.mCamera);
    }

    // The update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        // key input
        if (engine.input.isKeyClicked(engine.input.keys.A)) {
            this.next();
        }
        if (engine.input.isKeyClicked(engine.input.keys.Space)) {
            for (let i = 0; i < 25; i++) {
                for (let j = 0; j < 25; j++) {
                    if ((i != 0 && j != 0) || (i != 24 && j != 24))
                        this.mMesh.togglePinNode(i, j);
                }
            }
        }

        this.mMesh.update();
    }

    next() {
        super.next();

        let nextScene = new CollideScene();
        nextScene.start();
    }
        
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new StartScene();
    myGame.start();
}

export default StartScene;