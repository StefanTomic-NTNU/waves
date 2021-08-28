const boatScale = 6;
const animationSpeed = 40; // 40 is good
let rotationSpeed = 0.25;
let rotationMaximum = 9;
let waveXOffset = 0;
let rotationOffset = 0;
let rotationUp = rotationSpeed;
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


})


function drawCanvas() {
    ctx.clearRect(-canvas.width, -canvas.height, 2 * canvas.width, 2 * canvas.height); // clear the canvas
    ctx.save();

    $('#canvas1').css('background-color', 'azure');
    drawBoat();
    drawWaves();


    ctx.restore();
}


function drawWaves() {
    const l = 250; // wavelength
    const heightRatio = 0.55;
    const tf = l * 3 / 10; // two fifths of length to get sine-wave

    if (waveXOffset >= l) {
        waveXOffset = 0
    } else {
        // Boat speed is greater when sail is up
        if (mainsailUp) {
            waveXOffset += 1.75;
        } else {
            waveXOffset += 1;
        }
    }
    ctx.translate(-waveXOffset, 0);

    ctx.strokeStyle = "rgba(40, 135, 212, 0.7)";
    ctx.beginPath();

    ctx.moveTo(0, 0);
    for (let i = 0; i <= 15; i++) {
        ctx.bezierCurveTo(tf, -(l * heightRatio - tf), l - tf, l * heightRatio - tf, l, 0);
        ctx.translate(l, 0);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(-3 * canvas.width, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "rgba(40, 135, 212, 0.7)";
    ctx.fill();
    ctx.stroke();
}


function drawBoat() {
    // ctx.restore();
    if (mainsailUp) {
        rotationSpeed = 0.15;
        rotationMaximum = 6;
    } else {
        rotationSpeed = 0.3;
        rotationMaximum = 10;
    }
    if (rotationOffset >= rotationMaximum) {
        rotationUp = -rotationSpeed;
        rotationOffset += rotationUp;
    } else if (rotationOffset <= -rotationMaximum) {
        rotationUp = rotationSpeed;
        rotationOffset += rotationUp;
    } else {
        rotationOffset += rotationUp;
    }
    ctx.translate(canvas.width / 2, -10);
    ctx.rotate(rotationOffset * Math.PI / 180);

    // Drawing of hull above water
    ctx.beginPath();
    ctx.moveTo(-50 * boatScale, 0);
    ctx.lineTo(50 * boatScale, 0);
    ctx.lineTo(65 * boatScale, -10 * boatScale);
    ctx.lineTo(-53 * boatScale, -10 * boatScale);
    ctx.closePath();
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "white";
    ctx.stroke();
    ctx.fill();

    // Drawing of hull and keel underwater
    ctx.beginPath();
    ctx.moveTo(-50 * boatScale, 0);
    ctx.lineTo(50 * boatScale, 0);
    ctx.lineTo(35 * boatScale, 10 * boatScale);
    ctx.lineTo(15 * boatScale, 10 * boatScale);
    ctx.lineTo(10 * boatScale, 20 * boatScale);
    ctx.lineTo(-5 * boatScale, 20 * boatScale);
    ctx.lineTo(-5 * boatScale, 10 * boatScale);
    ctx.lineTo(-30 * boatScale, 8 * boatScale);
    ctx.lineTo(-30 * boatScale, 25 * boatScale);
    ctx.lineTo(-38 * boatScale, 25 * boatScale);
    ctx.lineTo(-38 * boatScale, 5 * boatScale);
    ctx.lineTo(-50 * boatScale, 0);
    ctx.closePath();
    ctx.strokeStyle = "darkred";
    ctx.fillStyle = "darkred";
    ctx.stroke();
    ctx.fill();

    // Drawing of mast and boom
    ctx.beginPath();
    ctx.moveTo(10 * boatScale, -10 * boatScale);
    ctx.lineTo(10 * boatScale, -125 * boatScale);
    ctx.lineTo(7.5 * boatScale, -125 * boatScale);
    ctx.lineTo(7.5 * boatScale, -20 * boatScale);
    ctx.lineTo(-40 * boatScale, -20 * boatScale);
    ctx.lineTo(-40 * boatScale, -17.5 * boatScale);
    ctx.lineTo(7.5 * boatScale, -17.5 * boatScale);
    ctx.lineTo(7.5 * boatScale, -10 * boatScale);
    ctx.closePath();
    ctx.strokeStyle = "lightgrey";
    ctx.fillStyle = "lightgrey";
    ctx.stroke();
    ctx.fill();

    // Drawing of mainsail
    if (mainsailUp) {
        ctx.beginPath();
        ctx.moveTo(7.5 * boatScale, -20 * boatScale);
        ctx.lineTo(-40 * boatScale, -20 * boatScale);
        ctx.lineTo(7.5 * boatScale, -125 * boatScale);
        ctx.closePath();
        ctx.strokeStyle = "lightgrey";
        ctx.fillStyle = "white";
        ctx.stroke();
        ctx.fill();
    }


    ctx.rotate((360 - rotationOffset) * Math.PI / 180);
    ctx.translate(-canvas.width / 2, 10);


}

// https://www.youtube.com/watch?v=UTHgr6NLeEw

function runAnimation(speed) {
    ctx.translate(0, canvas.height / 2);
    setInterval(drawCanvas, speed);
}


// https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
function toggleDocs() {
    let docs = document.getElementById('docs');
    if (docs.style.visibility === 'hidden') {
        docs.style.visibility = 'visible';
    } else {
        docs.style.visibility = 'hidden';
    }
}