let board;
let button;
let count = 0;

function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);
    
    button = new five.Button({ pin: 3, isPullup: true })

    button.on("press", function(){
            count = count+1
          });
}

function draw() {
    background(200);

    textSize(50)
    text(count, 350, 250);
}

