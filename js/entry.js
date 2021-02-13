import { buildScene } from './base/scene/base.scene.js';
import { createRectangle, createArrow } from './graph.util/shape.js';

let rec = createRectangle();

rec.on("ondragstart", function(){
    console.log("drag started");
})

rec.on("onclick", function(){
    console.log("I got clicked bitch");
})

rec.on("ondblclick", function(){
    console.log("I got dbleclicked bitch");
})

let objects = [
    rec,
    createRectangle({x: 50, y: 50}),
    createArrow()
];

let sceneController = buildScene(objects, "myCanvas");
sceneController.drawScene();

