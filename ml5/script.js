let board;
let bodyPose;
let video;
let poses = []

async function setup() {
    createCanvas(700, 500);
    board = createBoard();
    createConnectButton(board);

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
        //console.log(poses[0].nose);
        //let n = poses[0].nose;
        //fill("#FF0000");
        //circle(n.x, n.y, 100);

        strokeWeight(5);
        console.log(poses[0].left_eye);
        let a = poses[0].left_eye;
        circle(a.x, a.y, 75);
        fill("#ff009542")

        console.log(poses[0].right_eye);
        let b = poses[0].right_eye;
        circle(b.x, b.y, 75);
        line(b.x+30, b.y, a.x-30, a.y);

        console.log(poses[0].left_ear);
        console.log(poses[0].right_ear);
        let c = poses[0].left_ear;
        let d = poses[0].right_ear;
        line(c.x, c.y, a.x+30, a.y);
        line(d.x, d.y, b.x-30, b.y);


        //console.log(poses[0].nose);
        //let n = poses[0].nose;
        //line(c.x, c.y, )

    }

}