let board;
let potentiometer;
let currentPotValue = 0;
let servo;
let servoValue = 0;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    potentiometer = new five.Sensor("A0");
    servo = new five.Servo(3);

    potentiometer.on("change", function(latestvalue){
        currentPotValue = latestvalue;
    })

}

function draw() {
    background(200);
    servoValue = map(currentPotValue, 0, 1023, 0, 360);
    servo.to(servoValue);
}