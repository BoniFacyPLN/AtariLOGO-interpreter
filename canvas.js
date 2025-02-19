var c = document.getElementById("myCanvas"); //TODO: dwa canvasy, na jednym rzuf a na drugim linie
c.width = window.innerWidth;
c.height = window.innerHeight;
var ctx = c.getContext("2d");
var img = document.getElementById("rzut1");
//ctx.drawImage(img, 900, 700);

var v = document.getElementById("youCanvas"); //TODO: dwa canvasy, na jednym rzuf a na drugim linie
v.width = window.innerWidth;
v.height = window.innerHeight;
var ctv = v.getContext("2d");
ctv.clearRect(0, 0, v.width, v.height);
ctx.clearRect(0, 0, c.width, c.height);

rzptw = (c.width / 2) - (img.offsetWidth / 2);
rzpth = (c.height / 2) - (img.offsetWidth / 2);

class Turtle {
    pos_x = 0;
    pos_y = 0;

    last_pos_x = 0;
    last_pos_y = 0;

    angle = 0;
    ctx = null;
    ctv = null;
    turtleImg;

    constructor(post_x, post_y, ctx, ctv, turtleImg) {
        this.turtleImg = turtleImg;
        var isLoaded = this.turtleImg.complete && this.turtleImg.naturalHeight !== 0;
        console.log(isLoaded);
        this.pos_x = post_x;
        this.pos_y = post_y;

        this.last_pos_x = this.pos_x;
        this.last_pos_y = this.pos_y;

        this.ctx = ctx;
        this.ctv = ctv;

        this.ctx.moveTo(this.pos_x, this.pos_y);
        // this.ctx.moveTo(0, 0);
    }

    fd(pixels) {

        var wx = pixels * Math.sin(this.getAngle())
        var wy = pixels * Math.cos(this.getAngle());

        this.last_pos_x = this.pos_x;
        this.last_pos_y = this.pos_y;

        this.pos_x -= wx;
        this.pos_y -= wy;

    }

    drawTurtle() {
        this.ctv.save()

        //Convert degrees to radian
        var rad = this.getAngle();

        //Set the origin to the center of the image
        this.ctv.translate(this.pos_x, this.pos_y);

        //Rotate the canvas around the origin
        this.ctv.rotate(rad * (-1));

        //draw the image
        this.ctv.drawImage(this.turtleImg, this.turtleImg.offsetWidth / 2 * (-1), this.turtleImg.offsetHeight / 2 * (-1), this.turtleImg.offsetWidth, this.turtleImg.offsetHeight);

        // Restore canvas state as saved from above
        this.ctv.restore();
    }

    getAngle() {
        return (this.angle * Math.PI) / 180;
    }

    draw() {

        // ctx.clearRect((wspx - wx),(wspy+wy));
        // ctx.drawImage(img, post_x, post_y);
        console.log(this.pos_x, this.pos_y, this.angle);

        this.ctx.beginPath(); //rozpocznij rysowanie
        this.ctx.moveTo(this.last_pos_x, this.last_pos_y);
        this.ctx.lineTo(this.pos_x, this.pos_y); //rysuje linie po tej trasie
        this.ctx.stroke(); //zakończ rysowanie - rysuj

        this.drawTurtle();
    }
    remove() {
        ctv.clearRect(0, 0, ctv.canvas.width, ctv.canvas.height);
        ctv.stroke();
    }
    start() {
        this.ctx.stroke();
        ctx.moveTo(rzptw, rzpth);
        rzuf.remove();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


    }

}

let rzuf = new Turtle(rzptw, rzpth, ctx, ctv, img);

img.onload = function() {
    console.log("95");
    rzuf = new Turtle(rzptw, rzpth, ctx, ctv, img);
}
console.log("95");

wspx = (c.width / 2);
wspy = (c.height / 2);
var alfa = 0;


function draw() { //funkcja gdzie jest w sumie wszystko do rysowania

    var word = document.querySelector("#text_area").value;
    var split = word.split(" ");
    var direction = split[0];
    var value = Number(split[1]);

    rozbijanie(word);

    if (direction == "FD") {
        rzuf.remove();
        rzuf.fd(value);
        rzuf.draw();

    } else if (direction == "BK") {
        rzuf.remove();
        rzuf.fd(value * (-1));
        rzuf.draw();

    } else if (direction == "RT") {
        rzuf.remove();
        rzuf.angle -= value;
        rzuf.draw();

    } else if (direction == "LT") {
        rzuf.remove();
        rzuf.angle -= value * (-1);
        rzuf.draw();
    } else if (direction == "jp") { 
        rzuf.remove();
        wspx = wx + wspx;
        wspy = wspy - wy;
        ctx.moveTo(wspx, wspy);
        ctx.stroke();
    } else if (direction == "HT") {
        rzuf.remove();
    } else if (direction == "ST"){
        rzuf.draw();
    } else if (direction == "CS") {

        rzuf.start();
        //window.setInterval(location.reload(true), 1);


    } else {
        alert("Wpisz poprawnie kumplu :D  W razie problemów instrukcja jest tam <-----");

    }
    document.querySelector("#text_area").value = null; //czyści pole tekstowe po uruchomieniu komendy
}

/*KOMENDY I ILE MAJA PARAMETROW:
FD - I  RT - I  ST - 0  PU - 0  CS - 0
BK - I  LT - I  HT - 0  PD - 0
*/

function rozbijanie(word) {
    var line = word.split("\n"); //rozbija po \n
    console.log("ile komend = " + line.length);
    console.log(line); //wyrzuca wszystko pobrane do konsoli
    var line2 = line.join(" ");
    console.log(line2);
    var line3 = line2.split(" ");
    console.log(line3);
    var komendy = [];
    for (i = 0; i < line3.length; i++) {
        console.log("1");
        if (line3[i] == "FD") {
            komendy.push([line3[i], line3[++i]]);
        } else if (line3[i] == "BK"){
            komendy.push([line3[i], line3[++i]]);
        }else if (line3[i] == "RT") {
            komendy.push([line3[i], line3[++i]]);
        } else if (line3[i] == "LT"){
            komendy.push([line3[i], line3[++i]]);
        } else if (line3[i] == "jp") {
            komendy.push([line3[i], line3[++i]]);
        } else if (line3[i] == "HT") {
            komendy.push([line3[i]]);
        } else if (line3[i] == "ST"){
            komendy.push([line3[i]]);
        } else if (line3[i] == "CS") {
            komendy.push([line3[i]]);
        } else if (line3[i] == "PU"){
            komendy.push([line3[i]]);
        } else if (line3[i] == "PD"){
            komendy.push([line3[i]]);
        }

    }
    console.log(komendy);
    console.log(line3);
}