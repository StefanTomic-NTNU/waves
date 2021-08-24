const scale = 5;
const animationSpeed = 40;
let rotationSpeed = 0.3;
let rotationMaximum = 10;
let x_offset = 0;
let rotation_offset = 0;
let rotation_up = rotationSpeed;
let mainsailUp = false;
let canvas;
let ctx;

$(document).ready(function () {

    let $canvasQuery = $("#canvas1");
    canvas = $canvasQuery[0];
    ctx = canvas.getContext("2d");

    $canvasQuery.click(function () {
        if (mainsailUp) {
            mainsailUp = false;
        } else if (!mainsailUp) {
            mainsailUp = true;
        }
    })

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
        // Boat speed is greater when sail is up
        if (mainsailUp) {
            x_offset += 1.5;
        } else {
            x_offset += 1;
        }
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
    ctx.fillStyle = "rgba(40, 135, 212, 0.7)";
    ctx.fill();
    ctx.stroke();
}


function drawBoat() {
    // ctx.restore();
    if(mainsailUp) {
        rotationSpeed = 0.15;
        rotationMaximum = 6;
    } else {
        rotationSpeed = 0.3;
        rotationMaximum = 10;
    }
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

    // Drawing of hull and keel underwater
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
    ctx.lineTo(-50*scale, 0);
    ctx.closePath();
    ctx.strokeStyle = "darkred";
    ctx.fillStyle = "darkred";
    ctx.stroke();
    ctx.fill();

    // Drawing of mast and boom
    ctx.beginPath();
    ctx.moveTo(10*scale, -10*scale);
    ctx.lineTo(10*scale, -125*scale);
    ctx.lineTo(7.5*scale, -125*scale);
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

    // Drawing of mainsail
    if (mainsailUp) {
        ctx.beginPath();
        ctx.moveTo(7.5*scale, -20*scale);
        ctx.lineTo(-40*scale, -20*scale);
        ctx.lineTo(7.5*scale, -125*scale);
        ctx.closePath();
        ctx.strokeStyle = "lightgrey";
        ctx.fillStyle = "white";
        ctx.stroke();
        ctx.fill();
    }



    ctx.rotate((360-rotation_offset) * Math.PI / 180);
    ctx.translate(-canvas.width/2, 10);


}


function runAnimation(speed) {
    ctx.translate(0, canvas.height / 2);
    setInterval(drawCanvas, speed);
}