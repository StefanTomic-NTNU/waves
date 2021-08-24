const scale = 2;
const animationSpeed = 40;
const rotationMaximum = 10;
const rotationSpeed = 0.3;
let x_offset = 0;
let rotation_offset = 0;
let rotation_up = rotationSpeed;
let canvas;
let ctx;

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
    if (rotation_offset >= rotationMaximum) {
        rotation_up = -rotationSpeed;
        rotation_offset += rotation_up;
    } else if (rotation_offset <= -rotationMaximum) {
        rotation_up = rotationSpeed;
        rotation_offset += rotation_up;
    } else {
        rotation_offset += rotation_up;
    }
    ctx.translate(canvas.width/2, -10);
    ctx.rotate(rotation_offset * Math.PI / 180);

    // Drawing of hull above water
    ctx.beginPath();
    ctx.moveTo(-50*scale,0);
    ctx.lineTo(50*scale,0);
    ctx.lineTo(65*scale, -10*scale);
    ctx.lineTo(-53*scale, -10*scale);
    ctx.closePath();
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill();

    // Drawing of hull underwater
    ctx.beginPath();
    ctx.moveTo(-50*scale,0);
    ctx.lineTo(50*scale,0);
    ctx.lineTo(35*scale, 10*scale);
    ctx.lineTo(15*scale, 10*scale);
    ctx.lineTo(10*scale, 20*scale);
    ctx.lineTo(-5*scale, 20*scale);
    ctx.lineTo(-5*scale, 10*scale);
    ctx.lineTo(-30*scale, 8*scale);
    ctx.lineTo(-30*scale, 25*scale);
    ctx.lineTo(-38*scale, 25*scale);
    ctx.lineTo(-38*scale, 5*scale);
    ctx.lineTo(-50*scale, 0*scale);
    ctx.closePath();
    ctx.strokeStyle = "darkred";
    ctx.fillStyle = "darkred";
    ctx.stroke();
    ctx.fill();

    // Drawing of mast and boom
    ctx.beginPath();
    ctx.moveTo(10*scale, -10*scale);
    ctx.lineTo(10*scale, -100*scale);
    ctx.lineTo(7.5*scale, -100*scale);
    ctx.lineTo(7.5*scale, -20*scale);
    ctx.lineTo(-40*scale, -20*scale);
    ctx.lineTo(-40*scale, -17.5*scale);
    ctx.lineTo(7.5*scale, -17.5*scale);
    ctx.lineTo(7.5*scale, -10*scale);
    ctx.closePath();
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "lightgrey";
    ctx.stroke();
    ctx.fill();

    ctx.closePath();
    ctx.stroke();
    ctx.rotate((360-rotation_offset) * Math.PI / 180);
    ctx.translate(-canvas.width/2, 10);
    // ctx.strokeStyle = "darkblue";
}


function runAnimation(speed) {
    ctx.translate(0, canvas.height / 2);
    setInterval(drawCanvas, speed);
}