let x_offset = 0;
let canvas;
let ctx;
const scale = 10;

$(document).ready(function () {

    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");

    runAnimation(50);

    $("#gallery_title").hover(function () {
            $(this).css("color", "red");
        },
        function () {
            $(this).css("color", "blue");
        })



})


function drawCanvas() {
    // https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas

    ctx.clearRect(-canvas.width, -canvas.height, 2*canvas.width, 2*canvas.height); // clear the canvas
    ctx.save();

    $('#canvas1').css('background-color', 'azure');
    drawWaves();
    drawBoat();


    ctx.restore();
}



function drawWaves() {
    const l = 80; // wavelength
    const heightRatio = 0.55;
    const tf = l * 3 / 10; // two fifths of length for sine

    if (x_offset >= l) {
        x_offset = 0
    } else {
        x_offset += 1;
    }
    ctx.translate(-x_offset, 0);

    ctx.strokeStyle = "darkblue";
    ctx.beginPath();

    ctx.moveTo(0,0);
    for(let i = 0; i <= 15 ; i++) {
        ctx.bezierCurveTo(tf,-(l*heightRatio-tf),l-tf,l*heightRatio-tf,l,0);
        ctx.translate(l, 0);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(-3*canvas.width, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.stroke();
}


function drawBoat() {
    ctx.restore();
    ctx.translate(canvas.width/2, 0);
    ctx.beginPath();
    ctx.moveTo(-50,10)
    ctx.strokeStyle = "lightgrey";
    ctx.lineTo(50, 10);
    ctx.lineTo(70, -10);
    ctx.lineTo(-50, -10);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.translate(-canvas.width/2, 0);
    ctx.strokeStyle = "darkblue";
}


function runAnimation(speed) {
    ctx.translate(0, canvas.height / 2);
    setInterval(drawCanvas, speed);
}