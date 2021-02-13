
let CTX;
export function CanvasWrapper(){

    let obj = {};

    let canvas;
    let ctx;

    obj.init = function(id){
        canvas = document.getElementById(id);
        ctx = canvas.getContext("2d");
        CTX = ctx;
    }

    obj.setMouseHandlers = function(controller) {
        canvas.onmousedown = controller.preMovingHandler;
        canvas.onmouseup = controller.postMovingHandler;
        canvas.onmousemove = controller.duringMovingHandler;
        canvas.onclick = controller.clickHandler;
        canvas.ondblclick = controller.dblclickHandler; 
    }

    obj.setCursor = function(c) {
        canvas.style.cursor = c;
    }

    obj.drawShape = function(shape) {
        if(shape.type == 'arrow'){
            drawArrow(ctx, shape);
        } else if(shape.type == 'rectangle') {
            drawRectangle(ctx, shape);
        }
    }

    obj.clearScene = function() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

    obj.getMousePos = function(evt){
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    return obj;
}


export function getWidthOfText(text) {
    //CTX.font = text.font;
    return CTX.measureText(text.content).width;
}

export function getHeightOfText(text) {
    CTX.font = text.font;
    // ugly workaround to get the height of the text
    // https://stackoverflow.com/a/13318387
    return CTX.measureText('M').width;
}

function drawRectangle(ctx, rec) {
    ctx.beginPath();
    ctx.fillStyle = rec.color;
    ctx.lineWidth = rec.stroke;
    ctx.strokeStyle = "black";
    ctx.rect(rec.x, rec.y, rec.width, rec.height);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawText(ctx, text) {
    ctx.font = text.font;
    ctx.fillStyle = text.color;
    ctx.fillText(text.content, text.x, text.y);
}

function drawArrow(ctx, arrow) {
    ctx.beginPath();
    ctx.lineWidth = arrow.lineWidth; 
    ctx.strokeStyle = arrow.lineColor;

    // first draw arrow without tip
    ctx.moveTo(arrow.fromx, arrow.fromy);
    ctx.lineTo(arrow.tox, arrow.toy);
    ctx.stroke();

    // then draw the arrow tip
    ctx.fillStyle = arrow.tipColor;
    ctx.lineTo(arrow.tipVertices[0].x, arrow.tipVertices[0].y);
    ctx.lineTo(arrow.tipVertices[1].x, arrow.tipVertices[1].y);
    ctx.lineTo(arrow.tipVertices[2].x, arrow.tipVertices[2].y);
    ctx.fill();
    ctx.closePath();
}



