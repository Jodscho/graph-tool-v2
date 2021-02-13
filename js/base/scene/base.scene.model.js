export function SceneModel() {
    
    let obj = {};
   
    let shapesIdx = [];
    let shapes = [];

    obj.init = function(defaults) {
        if(defaults) {
            shapes = defaults;
        }
        initShapesArray();
    }

    obj.moveShapeToBack = function(id) {
        let fromIdx = shapesIdx.indexOf(id);
        let toIdx = shapesIdx.length-1;
        shapesIdx.splice(fromIdx, 1);
        shapesIdx.splice(toIdx, 0, id);
    }

    obj.getShapesIdx = function() { return shapesIdx };
    
    obj.findShapeById = function(id){
        for (let i = 0; i < shapes.length; i++ ) {
            if(shapes[i].id == id){
                return shapes[i];
            }
        }
    }

    function initShapesArray() {
        for (let i = 0; i < shapes.length; i++) {
           shapesIdx.push(shapes[i].id);
        }
    }

    return obj;

}

