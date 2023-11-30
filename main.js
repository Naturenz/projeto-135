objects = [];
status = "";

function preload(){
    video = createVideo('video.mp4');
}

function setup (){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}

function modelLoaded(){
    status = true;
 video.loop();
 video.speed(1);
 video.volume(0);

}

function gotResult(error,results){
    console.log(results);
    objects= results;
    if (error){
        console.log(error);
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detectando Objetos";
    console.log("teste");
}


function draw(){
    image(video,0,0,480,380);
    if (status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
                document.getElementById("status").innerHTML = "Status: Objetos Detectados";
                document.getElementById("numberOfobjects").innerHTML = "Quantidade de Objectos Detectados:" + objects.length;
                
                fill("FF0000");
                percent = floor(objects[i].confidence *100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke("#FF0000");
                rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

