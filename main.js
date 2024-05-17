objects = [];
video = "";
status1 = "";

function preload() {
    video = createCapture(480,380);
    video.hide();
}

function setup() {
    canvas = createCanvas(480,380);
    canvas.position(400,90);
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
           document.getElementById("status").innerHTML = "Status: Objects Detected";
           document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : "+ objects.length;

           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );

           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y,  objects[i].width, objects[i].height);

        }
    }

    
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML =  "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status1 = true;
}

function gotResult(error , results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}