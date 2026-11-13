let board;
let bodyPose;
let video;
let lcd;
let poses = [];
let letter = "P";
let lastCol = -1;
let lastRow = -1;

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

    stroke("#fffffff9");
    strokeWeight(2);
    line(0, height / 2, width, height / 2);

    let col = lastCol;
    let row = lastRow;

    if (poses.length > 0){

        let rw = poses[0].right_wrist;

        noStroke();
        fill("#00ff2a");
        circle(rw.x, rw.y, 20);

        col = round(map(rw.x, 0, width, 0, 15));
        col = constrain(col, 0, 15);

        row = rw.y < height / 2 ? 0 : 1;
    }

    if (col !== lastCol || row !== lastRow) {
        lcd.clear();
        lcd.cursor(row, col).print(letter);
        lastCol = col;
        lastRow = row;
    }
}