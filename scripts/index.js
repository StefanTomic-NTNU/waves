$(document).ready(function () {

    let canvas1 = $("#canvas1")[0];
    let ctx1 = canvas1.getContext("2d");

    // https://stackoverflow.com/questions/29917446/drawing-sine-wave-in-canvas

    draw_waves(canvas1, ctx1, 0)

    $("#gallery_title").hover(function () {
            $(this).css("color", "red");
        },
        function () {
            $(this).css("color", "blue");
        })



})


function draw_waves(canvas, ctx, offset) {
    const l = 50; // length
    const heightRatio = 0.8;
    const tf = l / 5; // two fifths of length

    ctx.translate(0, 100); // just for display

    ctx.beginPath();
    ctx.strokeStyle ='darkblue';

    ctx.moveTo(0,0);
    for(let i = 0; i < canvas1.width / l + 1; i++) {
        ctx.bezierCurveTo(tf,-(l*heightRatio-tf),l-tf,l*heightRatio-tf,l,0);
        ctx.translate(l, 0);
    }

    ctx.translate(-(canvas1.width / l + 1)*l, -100);
    //ctx.moveTo(canvas.width, 100);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fillStyle = "darkblue";
    ctx.fill();
    ctx.stroke();



}