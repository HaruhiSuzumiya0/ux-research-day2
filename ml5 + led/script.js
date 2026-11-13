let board;
let bodyPose;
let video;
let poses = []
let led;

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    led = new five.Led(3);

    video = createCapture(VIDEO);
    video.size(700, 500)
    video.hide();
    
    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function(results){
        poses = results;
    })
}

function draw() {
   image(video, 0, 0);

    if (poses.length > 0){
        //console.log(poses[0].right_wrist);
        let r = poses[0].right_wrist;

        //console.log(poses[0].left_wrist);
        let l = poses[0].left_wrist;
        
        let distance = parseInt(dist(r.x, r.y, l.x, l.y));

        console.log(distance);
        text(distance, 10, 10);

        let intansity = map(distance, 150, 500, 0, 255);

        led.brightness(intansity);

    }

}