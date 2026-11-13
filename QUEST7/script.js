let board;
let handPose;
let video;
let led1;
let led2;
let led3;
let led4;
let led5;
let poses = [];
let hands = [];

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

    video = createCapture(VIDEO);
    video.size(700, 500);
    video.hide();

    led1 = new five.Led(7);
    led2 = new five.Led(6);
    led3 = new five.Led(5);
    led4 = new five.Led(4);
    led5 = new five.Led(3);

    handPose = await ml5.handPose();
    handPose.detectStart(video, function (results) {
        hands = results;
    });
}

function draw() {
    image(video, 0, 0);

    //led1.on();

    if (hands.length > 0){
        let thumbTip = hands[0].thumb_tip;
        let thumbIp = hands[0].thumb_ip;
        let indexTip = hands[0].index_finger_tip;
        let indexPip = hands[0].index_finger_pip;
        let middleTip = hands[0].middle_finger_tip;
        let middlePip = hands[0].middle_finger_pip;
        let ringTip = hands[0].ring_finger_tip;
        let ringPip = hands[0].ring_finger_pip;
        let pinkyTip = hands[0].pinky_finger_tip;
        let pinkyPip = hands[0].pinky_finger_pip;
        let pinkyBase = hands[0].pinky_finger_mcp;

        let dTip = dist(thumbTip.x, thumbTip.y, pinkyBase.x, pinkyBase.y);
        let dIp = dist(thumbIp.x, thumbIp.y, pinkyBase.x, pinkyBase.y);
        if (dTip > dIp){
            led1.on();
        } else {
            led1.off();
        }

        if (indexTip.y < indexPip.y){
            led2.on();
        } else {
            led2.off();
        }

        if (middleTip.y < middlePip.y){
            led3.on();
        } else {
            led3.off();
        }

        if (ringTip.y < ringPip.y){
            led4.on();
        } else {
            led4.off();
        }

        if (pinkyTip.y < pinkyPip.y){
            led5.on();
        } else {
            led5.off();
        }
    } else {
        led1.off();
        led2.off();
        led3.off();
        led4.off();
        led5.off();
    }
}
