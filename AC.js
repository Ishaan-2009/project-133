status = "";
AC_img = "";
objects = [];

function preload() {
    AC_img = loadImage("AC.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detetcing objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(AC_img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(AC_img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("status").innerHTML = "Status: Objects detetcted";

            }
    }
}