import { Rectangle } from '../base/shapes/base.rectangle.js';
import { Arrow } from '../base/shapes/base.arrow.js';

const DEFAULT_RECTANGLE = {
    x: 20,
    y: 20,
    width: 50,
    height: 50,
    stroke: 2,
    color: "white",
    type: "rec"
}
const DEFAULT_ARROW = {
    fromx: 80,
    fromy: 90,
    tox: 60,
    toy: 40,
    type: "arrow",
    tipLength: 20,
    tipWidth: 10, 
    lineWidth: 1.5,
    tipColor: "#d1d1d1",
    lineColor: "#d1d1d1"
}


export function createRectangle(pos) {

    let config = Object.assign({}, DEFAULT_RECTANGLE);

    if(pos) {
       config.x = pos.x; 
       config.y = pos.y; 
    }

    return Rectangle(config);
}

export function createArrow(pos){

    let config = Object.assign({}, DEFAULT_ARROW);

    if(pos) {
       config.tox = pos.tox; 
       config.toy = pos.toy; 
       config.fromx = pos.fromx; 
       config.fromy = pos.fromy; 
    }

    return Arrow(config);
}

