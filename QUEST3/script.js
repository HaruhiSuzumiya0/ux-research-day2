let board;
let potentiometer;
let currentPotValue = 0;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    potentiometer = new five.Sensor("A0");

    potentiometer.on("change", function(latestvalue){
        currentPotValue = latestvalue;
    })

}

function draw() {
    background(200);
    //rectangleHeight = map(currentPotValue, 0, 1023, 0, 360);
    rect(300, 400, 100, -1*currentPotValue);
}