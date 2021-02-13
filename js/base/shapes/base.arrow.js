import { Shape } from './base.shape.js';

export function Arrow(config){

    let obj = Shape("arrow");

    obj.tox = config.tox;
    obj.toy = config.toy;
    obj.fromx = config.fromx;
    obj.fromy = config.fromy;
    obj.lineWidth = config.lineWidth;
    obj.lineColor = config.lineColor;
    obj.tipColor = config.tipColor;
    obj.tipWidth = config.tipWidth;
    obj.tipLength = config.tipLength;
    obj.tipVertices = calculateTipVertices(obj);

    obj.updateShapePosition = function(diffX, diffY){
            obj.fromx += diffX;
            obj.fromy += diffY;
            obj.tox += diffX;
            obj.toy += diffY;
            obj.tipVertices = calculateTipVertices(obj);
    }

    obj.resetEndPosition = function(x, y) {
        obj.tox = x;
        obj.toy = y;
        obj.tipVertices = calculateTipVertices(obj);
    }

    obj.resetStartPosition = function(x, y) {
        obj.fromx = x;
        obj.fromy = y;
        obj.tipVertices = calculateTipVertices(obj);
    }


    obj.isPointInShape = function(mouse) {

        let d1, d2, d3;
        let has_neg, has_pos;

        let v1 = obj.tipVertices[0];
        let v2 = obj.tipVertices[1];
        let v3 = obj.tipVertices[2];

        d1 = sign(mouse, v1, v2);
        d2 = sign(mouse, v2, v3);
        d3 = sign(mouse, v3, v1);

        has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
        has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

        return !(has_neg && has_pos);
    }

    return obj;
}

function calculateTipVertices(arrow) {
    const tipLen = arrow.tipLength;
    const tipWidth = arrow.tipWidth;

    const dx = arrow.tox - arrow.fromx
    const dy = arrow.toy - arrow.fromy
    const angle = Math.atan2(dy, dx);

    let angleForComp = (angle < 0) ? angle + (2 * Math.PI) : angle;
    let addToAngle = Math.PI / 2

    if (dx >= 0 && dy >= 0) {
        // first quadrant
        angleForComp = angle;
    } else if (dx <= 0 && dy >= 0) {
        // second quadrant
        angleForComp = Math.PI - angleForComp;
    } else if (dx <= 0 && dy <= 0) {
        // third quadrant
        angleForComp -= Math.PI;
    } else if (dx >= 0 && dy <= 0) {
        // fourth quadrant
        angleForComp = 2 * Math.PI - angleForComp;
    }

    let hyp = Math.sqrt(Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2));
    let newx = Math.cos(angleForComp) * (hyp - tipLen) - Math.abs(dx);
    let newy = Math.sin(angleForComp) * (hyp - tipLen) - Math.abs(dy);

    let tipStartX;
    let tipStartY;

    if (dx <= 0) {
        tipStartX = arrow.tox - newx;
    } else {
        tipStartX = arrow.tox + newx;
    }

    if (dy <= 0) {
        tipStartY = arrow.toy - newy;
    } else {
        tipStartY = arrow.toy + newy;
    }

    let vertexRightX = tipStartX + tipWidth * Math.cos(angle + addToAngle);
    let vertexRightY = tipStartY + tipWidth * Math.sin(angle + addToAngle);
    let vertexLeftX = tipStartX - tipWidth * Math.cos(angle + addToAngle);
    let vertexLeftY = tipStartY - tipWidth * Math.sin(angle + addToAngle);

    return [
        { "x": vertexRightX, "y": vertexRightY },
        { "x": vertexLeftX, "y": vertexLeftY },
        { "x": arrow.tox, "y": arrow.toy }
    ];

}

function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}
