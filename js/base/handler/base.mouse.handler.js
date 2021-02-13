export function MouseHandler(canvas){

    let obj = {};

    let mousePos;

    obj.freezeMousePosition = function(event){
        mousePos = canvas.getMousePos(event);
        return mousePos;
    }

    obj.getDifference = function(){
        let mouse = canvas.getMousePos(event);
        let diff = {
            x: mouse.x - mousePos.x,
            y: mouse.y - mousePos.y
        }
        mousePos = mouse;
        return diff;
    }

    return obj;
}


