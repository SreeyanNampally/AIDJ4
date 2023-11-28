music1 = "";
music2 = "";
song1status = "";
song2status = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;
scorelw = 0;
scorerw = 0;

function setup(){
    canvas = createCanvas(500,500);
    canvas.center();
    video = createCapture(VIDEO)
    video.hide()
    pose = ml5.poseNet(video)
    pose.on("pose", gotPoses)
}

function draw(){
    image(video, 0, 0, 500, 500)
    fill("red")
    stroke("red")
    circle(rwx, rwy, 20)
    if(scorelw>0.2){
        circle(lwx, lwy, 20)
        music2.stop()
        if(music1.isPlaying() == false){
            song1status = "play";
            music1.play();
            document.getElementById("songname").innerHTML = "song1 is playing";
        }
    }

    
}

function preload(){
    music1 = loadSound("ringtone.mp3")
    music2 = loadSound("ring2.mp3")
}


function modelloaded(){
    console.log("model loaded")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        lwx = results[0].pose.leftWrist.x;
        rwx = results[0].pose.rightWrist.x;
        lwy = results[0].pose.leftWrist.y;
        rwy = results[0].pose.rightWrist.y;
        scorerw = results[0].pose.keypoints[10].score
        scorelw = results[0].pose.keypoints[9].score
    }
}