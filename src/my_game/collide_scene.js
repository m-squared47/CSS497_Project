"use strict";  // Operate in Strict mode such that variables must be declared before used!

import GameObject from "../engine/game_objects/game_object.js";
import engine from "../engine/index.js";
import Renderable from "../engine/renderables/renderable.js";
import StartScene from "./my_game.js";


class CollideScene extends engine.Scene {
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
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
        // sets the background to gray
        this.mMesh = new engine.Mesh(50, 50, 50, 50, 2, 0.5, 0);
        this.mMesh.togglePinNode(0, 24);
        this.mMesh.togglePinNode(12, 24);
        this.mMesh.togglePinNode(24, 24);

        let CollidableRen = new Renderable();
        CollidableRen.getXform().setSize(15, 15);
        CollidableRen.getXform().setPosition(40, 15);
        CollidableRen.setColor([255, 0, 0, 255]);
        this.mCollidableUp = new GameObject(CollidableRen);
        this.mCollidableUp.setSpeed(0.01);

        CollidableRen = new Renderable();
        CollidableRen.getXform().setSize(15, 15);
        CollidableRen.getXform().setPosition(10, 50);
        CollidableRen.setColor([255, 0, 0, 255]);
        this.mCollidableLeft = new GameObject(CollidableRen);
        this.mCollidableLeft.setSpeed(0.01);
        

        this.mMesh.addCollision(this.mCollidableUp);
        this.mMesh.addCollision(this.mCollidableLeft);
    }

    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

        // Step  B: Activate the drawing Camera
        this.mCamera.setViewAndCameraMatrix();

        this.mMesh.draw(this.mCamera);

        this.mCollidableUp.draw(this.mCamera);
        this.mCollidableLeft.draw(this.mCamera);
    }

    // The update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update() {
        if (engine.input.isKeyClicked(engine.input.keys.A)) {
            this.next();
        }

        this.mCollidableLeft.rotateObjPointTo(vec2.fromValues(50, 50), 5);
        this.mCollidableUp.update();
        this.mCollidableLeft.update();
        this.mMesh.update();
    }

    next() {
        super.next();

        let nextScene = new StartScene();
        nextScene.start();
    }
        
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new Collide_scene();
    myGame.start();
}

export default CollideScene;