// model name : CocoSsd (Coco Single Shot MultiBox Detection);

var status = "";
var objects = [];
var percent = "";
var red1 = "";
var blue1 = "";
var green1 = "";


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function preload() {
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {

            red1 = Math.floor(Math.random() * 255);
            blue1 = Math.floor(Math.random() * 255);
            green1 = Math.floor(Math.random() * 255);

            document.getElementById("status").innerHTML = "Status : Detected Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects : "+objects.length;

            fill(red, blue, green);

            percent = objects[i].confidence.toFixed(2) * 100;
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(red, blue, green);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
        noLoop();

    }

}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}
function gotResult(error, result) {
    if (error) {
        console.log(error);
    } else {
        console.log(result);
        objects = result;
    }
}