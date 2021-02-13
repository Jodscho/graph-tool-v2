export function ShapeDragAndDropHandler(model) {

    let obj = {};

    let aquiredShapeIdx = -1;
    let aquiredShapeId;
    let sceneModel = model;


    obj.updateAquiredShapesPosition = function(diffX, diffY) {
        sceneModel.findShapeById(aquiredShapeId).updateShapePosition(diffX, diffY);
    }

    obj.aquireShape = function(mouse) {
        let shapesIdx = sceneModel.getShapesIdx();
        for (let i = shapesIdx.length-1; i >= 0; i--) {
            if (sceneModel.findShapeById(shapesIdx[i]).isPointInShape(mouse)) {
                aquiredShapeIdx = i;
                aquiredShapeId = shapesIdx[i];
                repositionShape();
                return true;
            }
        }
        return false;
    }

    obj.isShapeAquired = function() { return !(aquiredShapeIdx == -1); }

    obj.releaseShape = function() { aquiredShapeIdx = -1; }
    
    function repositionShape(){

        let shapesIdx = sceneModel.getShapesIdx();

        if(aquiredShapeIdx == shapesIdx.length -1){
            return; 
        }

        sceneModel.moveShapeToBack(aquiredShapeId);
        aquiredShapeIdx = shapesIdx.length - 1;
    }

    obj.executeShapeHandler = function(eventType){

        let shape = sceneModel.findShapeById(aquiredShapeId);
    
        if(shape.handlers[eventType]){
            shape.handlers[eventType]();
        }
    }

    return obj;

}


