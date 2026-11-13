let board;
let bodyPose;
let video;
let ledRed;
let ledGreen;
let poses = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    video = createCapture(VIDEO);
    video.size(700, 500)
    video.hide();

    ledGreen = new five.Led(3);
    ledRed = new five.Led(4);
    
    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;
    })
}

function draw() {
   image(video, 0, 0);

    if (poses.length >= 2){
        let r0 = poses[0].right_wrist;
        let r1 = poses[1].right_wrist;

        fill(255, 0, 0);
        circle(r0.x, r0.y, 20);
        fill(0, 0, 255);
        circle(r1.x, r1.y, 20);
        stroke(255);
        line(r0.x, r0.y, r1.x, r1.y);

        let distance = dist(r0.x, r0.y, r1.x, r1.y);

        console.log(distance);

        if(distance < 100){
            ledGreen.on();
            ledRed.off();
        }else{
            ledRed.on();
            ledGreen.off();
        }

    }

}