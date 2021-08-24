let x_offset = 0;
let canvas;
let ctx;

$(document).ready(function () {

    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");

    // https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas

    loop_waves(100);

    $("#gallery_title").hover(function () {
            $(this).css("color", "red");
        },
        function () {
            $(this).css("color", "blue");
        })



})


function draw_waves() {
    const l = 60; // length
    const heightRatio = 0.6;
    const tf = l / 5; // two fifths of length

    // ctx.save();

    ctx.clearRect(-canvas.width, -canvas.height, 2*canvas.width, 2*canvas.height); // clear the canvas
    ctx.translate(0, 100); // just for display
    ctx.save();
    if (x_offset >= l) {
        ctx.translate(l, 0);
        x_offset -= l;
    } else {
        ctx.translate(-1, 0);
        x_offset += 1;
    }

    ctx.beginPath();
    ctx.strokeStyle ='darkblue';

    ctx.moveTo(0,0);
    for(let i = 0; i < (canvas1.width) / l +3 ; i++) {
        ctx.bezierCurveTo(tf,-(l*heightRatio-tf),l-tf,l*heightRatio-tf,l,0);
        ctx.translate(l, 0);
    }

    ctx.translate(-((canvas1.width) / l + 3)*l, -100);
    //ctx.moveTo(canvas.width, 100);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(-l, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.stroke();

    ctx.save();

}

function loop_waves(speed) {

    setInterval(draw_waves, speed);
}