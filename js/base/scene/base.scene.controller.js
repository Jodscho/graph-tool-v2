export function SceneController(model, c) {

    let obj = {};

    let sceneModel = model;
    let canvas = c;

    obj.drawScene = function() {
        canvas.clearScene();
        let shapesIdx = sceneModel.getShapesIdx();
        for (let i = 0; i < shapesIdx.length; i++ ) {
            let shape = sceneModel.findShapeById(shapesIdx[i]);
            canvas.drawShape(shape);
        }
    }

    obj.setCursor = function(cursor) {
        canvas.setCursor(cursor);
    }

    return obj;
}

