/*
 * File: index.js
 *  
 * serves as central export of the entire engine
 * client programs can simply import this file 
 * for all symbols defined in the engine
 * 
 */
"use strict";

// resources
import * as audio from "./resources/audio.js";
import * as text from "./resources/text.js";
import * as xml from "./resources/xml.js";
import * as json from "./resources/json.js";
import * as texture from "./resources/texture.js";
import * as font from "./resources/font.js";
import * as defaultResources from "./resources/default_resources.js";

// general utilities
import * as input from "./input.js";
import Camera from "./camera.js";
import Scene from "./scene.js";
import Transform from "./transform.js";
import BoundingBox from "./bounding_box.js";
import { eBoundCollideStatus } from "./bounding_box.js";
import Dialog from "./dialog.js";

// renderables 
import Renderable from "./renderables/renderable.js";
import TextureRenderable from "./renderables/texture_renderable.js";
import SpriteRenderable from "./renderables/sprite_renderable.js";
import SpriteAnimateRenderable from "./renderables/sprite_animate_renderable.js";
import SpriteAnimateParamRenderable from "./renderables/sprite_animate_param_renderable.js";
import FontRenderable from "./renderables/font_renderable.js";
import ScrollingFontRenderable from "./renderables/scrolling_font_renderable.js";
import { eTexCoordArrayIndex } from "./renderables/sprite_renderable.js";
import { eAnimationType } from "./renderables/sprite_animate_renderable.js";

// game objects
import GameObject from "./game_objects/game_object.js";
import GameObjectSet from "./game_objects/game_object_set.js";

// Prefabs
import Mesh from "./prefabs/mesh.js";
import Node from "./prefabs/node.js";
import Spring from "./prefabs/spring.js";

// Physics
import Physics from "./physics/physics.js";

// local to this file only
import * as glSys from "./core/gl.js";
import * as vertexBuffer from "./core/vertex_buffer.js";
import * as shaderResources from "./core/shader_resources.js";
import * as loop from "./core/loop.js";

// general engine utilities
function init(htmlCanvasID) {
    glSys.init(htmlCanvasID);
    vertexBuffer.init();
    input.init();
    audio.init();
    shaderResources.init();
    defaultResources.init();
}

function cleanUp() {
    loop.cleanUp();
    shaderResources.cleanUp();
    defaultResources.cleanUp();
    audio.cleanUp();
    input.cleanUp();
    vertexBuffer.cleanUp();
    glSys.cleanUp();
}

function clearCanvas(color) {
    let gl = glSys.get();
    gl.clearColor(color[0], color[1], color[2], color[3]);  // set the color to be cleared
    gl.clear(gl.COLOR_BUFFER_BIT);      // clear to the color previously set
}


export default {
    // resource support
    audio, text, xml, json, texture, font, defaultResources,

    // input support
    input,

    // Util classes
    Camera, Scene, Transform, BoundingBox, Dialog, 
    
    // Renderables
    Renderable, TextureRenderable, SpriteRenderable, SpriteAnimateRenderable, SpriteAnimateParamRenderable, FontRenderable, ScrollingFontRenderable,

    // Game Objects
    GameObject, GameObjectSet,

    // Prefabs
    Mesh, Node, Spring,

    // Physics
    Physics,

    // constants
    eTexCoordArrayIndex, eAnimationType, eBoundCollideStatus,

    // functions
    init, cleanUp, clearCanvas
}
