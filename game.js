var pipeAsset, bird1Asset, bird2Asset;
const desiredFrameRate = 30;

var gravity;
var player1;
var pipes;
var progress = 0;

function setup() {
    frameRate(desiredFrameRate);
    createCanvas(1000, 600);
    pipeAsset = loadImage("assets/pipe.png");
    bird1Asset = loadAnimation(["assets/bird1/frame-1.png",
        "assets/bird1/frame-2.png",
        "assets/bird1/frame-3.png",
        "assets/bird1/frame-4.png"
    ])

    gravity = createVector(0, 0.1);

    bird2Asset = loadAnimation([
        "assets/grumpy1/PNG/frame-1.png",
        "assets/grumpy1/PNG/frame-2.png",
        "assets/grumpy1/PNG/frame-3.png",
        "assets/grumpy1/PNG/frame-4.png",
        "assets/grumpy1/PNG/frame-5.png",
        "assets/grumpy1/PNG/frame-6.png",
        "assets/grumpy1/PNG/frame-7.png",
        "assets/grumpy1/PNG/frame-8.png",
    ])

    pipes = [
        createVector(100, 200),
        createVector(300, 200),
        createVector(500, 300),
        createVector(700, 300),
        createVector(900, 300),
    ]

    player1 = {
        pos: createVector(bird1Asset.width * 100, 150),
        speed: createVector(1, 0), // always go forward
        vel: createVector(0, 0), // maybe go up
    }
}

function update() {
    progress += player1.speed.x

    player1.vel.add(gravity)
    
    player1.speed.add(player1.vel)
    player1.speed.y = constrain(player1.speed.y, 0, 15)
    
    player1.pos.add(player1.speed)
    player1.pos.x = constrain(player1.pos.x, 0, width)
    player1.pos.y = constrain(player1.pos.y, 0, height)

    // console.log(player1.pos, player1.speed, player1.vel);

    // player2.add(birdSpeed).add(gravity);

    if (pipes[0].x + pipeAsset.width < progress) {
        pipes.shift();
    }

    if (pipes.length < 6) {
        pipes.push(createVector(
            progress + width + pipeAsset.width,
            height * constrain(Math.random(), 0.3, 0.7),
        ))
    }
}


var player1Speed;

function keyTyped() {
    console.log("keyTyped")
    if (key == ' ') {
        player1.vel = player1.vel.add(createVector(0, -2))
    }
}

function draw() {
    update();
    background(220);

    translate(-progress, 0)
    pipes.forEach((pipe) => {
        drawPipes(pipe.x, pipe.y, 250);
    })

    renderAnimation(bird1Asset, player1.pos.x, player1.pos.y);
    // renderAnimation(bird2Asset, player2.x, player2.y);
}

function drawPipes(x, y, gap) {
    // Top
    push();
    translate(x, y - gap /2);
    rotate(PI);
    scale(2.0);
    image(pipeAsset, -pipeAsset.width / 2, 0);
    pop();
    
    // Bottom
    push();
    translate(x, y + gap / 2)
    scale(2.0); 
    image(pipeAsset, -pipeAsset.width / 2, 0);
    pop();
}

function loadAnimation(files) {
    let images = files.map((f) => loadImage(f));

    return {
        width: images[0].width,
        height: images[0].height,
        frame: 0,
        frames: images.length,
        images,
    }
}

function renderAnimation(animation, x, y) {
    var img = animation.images[animation.frame];
    animation.frame = int(frameCount / (desiredFrameRate/8)) % animation.frames;

    push();
    translate(x, y)
    scale(0.2)
    image(img, -img.width / 2, -img.height/2);
    pop();
}