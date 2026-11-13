let board;
let microphone;
let currentMicValue = 0;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    microphone = new five.Sensor("A0");

    microphone.on("change", function(latestvalue){
        currentMicValue = latestvalue;
    })
}

function draw() {
    background(200);

    square(width/2, height/2, currentMicValue);
}