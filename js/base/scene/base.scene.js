import { CanvasWrapper } from './canvas/base.canvas.js';
import { SceneModel } from './base.scene.model.js';
import { ShapeDragAndDropHandler } from '../handler/base.shape.handler.js';
import { SceneInteraction } from './base.scene.interaction.js';
import { MouseHandler } from '../handler/base.mouse.handler.js';
import { SceneController } from './base.scene.controller.js';

export function buildScene(defaults, id){

    let sceneModel = SceneModel();
    sceneModel.init(defaults);

    let canvas = CanvasWrapper();
    canvas.init(id);

    let sceneController = SceneController(sceneModel, canvas);

    let interaction = SceneInteraction(
        ShapeDragAndDropHandler(sceneModel),
        MouseHandler(canvas),
        sceneController
    );

    canvas.setMouseHandlers(interaction);

    return sceneController;

}     
