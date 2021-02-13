export function SceneInteraction(s, m, c){

    var obj = {};

    let shapeHandler = s;
    let mouseHandler = m;
    let sceneController = c;

    obj.preMovingHandler = function(event){

        let mouse = mouseHandler.freezeMousePosition(event);
        let shapeFound = shapeHandler.aquireShape(mouse);
    
        if(!shapeFound){
            return;
        }

        sceneController.setCursor("grab"); 
        shapeHandler.executeShapeHandler("ondragstart");

    }


    obj.duringMovingHandler = function(event) {

        if (!shapeHandler.isShapeAquired()) { 
            return;
        }

        let diff = mouseHandler.getDifference(event);
        shapeHandler.updateAquiredShapesPosition(diff.x, diff.y);
        sceneController.drawScene();
        shapeHandler.executeShapeHandler("ondragmove");
    }

    obj.postMovingHandler = function(event){

        if(!shapeHandler.isShapeAquired()) {
            return;
        }

        sceneController.setCursor("default"); 
        shapeHandler.executeShapeHandler("ondragend");
        shapeHandler.releaseShape(); 
    }

    function clickHandler(event, eventType) {
        let mouse = mouseHandler.freezeMousePosition(event);
        if(!shapeHandler.aquireShape(mouse)){
           return; 
        }
        shapeHandler.executeShapeHandler(eventType);
        shapeHandler.releaseShape();
    }

    obj.dblclickHandler = function(event) {
        clickHandler(event, "ondblclick");
    }

    obj.clickHandler = function(event) {
        clickHandler(event, "onclick");
    }



    return obj;

}


