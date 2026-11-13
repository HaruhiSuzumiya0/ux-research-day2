let board;
let bodyPose;
let video;
let lcd;
let poses = [];
let floor = {
    x: 0,
    y: 400,  
    w: 700,
    h: 100
};
let lastMessage = ""; 

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    lcd = new five.LCD({ controller: "PCF8574" });

    bodyPose = await ml5.bodyPose();
    bodyPose.detectStart(video, function (results) {
        poses = results;
    });
}

function draw() {
    image(video, 0, 0);

    noStroke();
    fill("#FF000088");
    rect(floor.x, floor.y, floor.w, floor.h);

    let isColliding = false;

    if (poses.length > 0){


        let ra = poses[0].right_ankle;

        if (ra.y > floor.y) {
            isColliding = true;
        }
    }

    let message = isColliding ? "Floor is lava!" : "Everyone is safe";
    
    if (message !== lastMessage) {
        lcd.clear();
        lcd.print(message);
        lastMessage = message;
    }
}