$(document).ready(function () {
    $("#gallery_title").hover(function () {
            $(this).css("color", "red");
        },
        function () {
            $(this).css("color", "blue");
        })
})