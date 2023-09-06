status = "";
bedroom_img = "";
objects = [];

function preload() {
    bedroom_img = loadImage("bedroom.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(bedroom_img, gotResults);
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
    image(bedroom_img, 0, 0, 640, 420);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("status").innerHTML = "Status: Objects detetcted";

            }
    }
}