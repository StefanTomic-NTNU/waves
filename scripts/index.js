let x_offset = 0;
let canvas;
let ctx;
const scale = 1.8;
const animationSpeed = 35;

$(document).ready(function () {

    canvas = $("#canvas1")[0];
    ctx = canvas.getContext("2d");

    runAnimation(animationSpeed);

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
    drawBoat();
    drawWaves();


    ctx.restore();
}



function drawWaves() {
    const l = 150; // wavelength
    const heightRatio = 0.55;
    const tf = l * 3 / 10; // two fifths of length for sine

    if (x_offset >= l) {
        x_offset = 0
    } else {
        x_offset += 1;
    }
    ctx.translate(-x_offset, 0);

    ctx.strokeStyle = "rgba(40, 135, 212, 0.7)";
    ctx.beginPath();

    ctx.moveTo(0,0);
    for(let i = 0; i <= 15 ; i++) {
        ctx.bezierCurveTo(tf,-(l*heightRatio-tf),l-tf,l*heightRatio-tf,l,0);
        ctx.translate(l, 0);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(-3*canvas.width, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "rgba(40, 135, 212, 0.7)";;
    ctx.fill();
    ctx.stroke();
}


function drawBoat() {
    // ctx.restore();
    ctx.translate(canvas.width/2, 0);
    ctx.beginPath();
    ctx.moveTo(-50*scale,10*scale)
    ctx.strokeStyle = "lightgrey";
    ctx.lineTo(50*scale, 10*scale);
    ctx.lineTo(70*scale, -10*scale);
    ctx.lineTo(-50*scale, -10*scale);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();
    ctx.translate(-canvas.width/2, 0);
    // ctx.strokeStyle = "darkblue";
}


function runAnimation(speed) {
    ctx.translate(0, canvas.height / 2);
    setInterval(drawCanvas, speed);
}