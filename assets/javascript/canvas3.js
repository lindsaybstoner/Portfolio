var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//c stands for context, gets tons of objects and methods to the c variable to draw
//within our canvas
var c = canvas.getContext("2d");

/* c.beginPath();
c.moveTo(200, 300);
c.lineTo(500, 50);
c.strokeStyle = "green";
c.stroke();
 */
for (var i = 0; i < 3; i++) {
    var a = Math.random() * window.innerWidth;
    var b = Math.random() * window.innerHeight;
    /* var c = Math.random() * window.innerWidth;
    var d = Math.random() * window.innerHeight; */

    c.beginPath();
    c.moveTo(200, 300);
    c.lineTo(a, b);
    c.lineTo(700, 80);

    c.strokeStyle = "green";
    c.stroke();
    /* c.moveTo(400, 60);
    c.lineTo(a, b); */
}



