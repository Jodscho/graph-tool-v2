export function Shape(type){

    let obj = {};    

    obj.id = Shape.identities;
    obj.type = type;
    obj.dragable = true;

    obj.handlers = {};
    obj.on = function(eventType, handler){
        this.handlers[eventType] = handler;
    }
    
    Shape.identities++;

    return obj;
}

Shape.identities = 0;

