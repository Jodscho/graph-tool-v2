import { Shape } from './base.shape.js';

export function Rectangle(config){
    let obj = Shape("rectangle");

    obj.x = config.x;
    obj.y = config.y;
    obj.oldx = config.x;
    obj.oldy = config.y;
    obj.width = config.width;
    obj.height = config.height;
    obj.color = config.color;
    obj.stroke = config.stroke;

    obj.updateShapePosition = function(diffX, diffY){
        obj.x += diffX;
        obj.y += diffY;
    }

    obj.isPointInShape = function(mouse){

        let left = obj.x - obj.stroke / 2;
        let top = obj.y - obj.stroke / 2;
        let right = obj.x + obj.width + obj.stroke / 2;
        let bottom = obj.y + obj.height + obj.stroke / 2;

        return mouse.x >= left &&
            mouse.x <= right &&
            mouse.y >= top &&
            mouse.y <= bottom;
    }

    return obj;
}