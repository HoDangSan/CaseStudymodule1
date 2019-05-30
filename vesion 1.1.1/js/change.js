let arrbullet = [];
//ball
let arrBall = [];
let widthBall = 25;
let heightBall = 50;
let speedBall = 2;
// đếm số hoạt ảnh
let countTime = 0;
//audio
let mySound = new Audio("audio/shoot.mp3");
let shootTrue = new Audio("audio/shootTrue.mp3");
let gameover = new Audio("audio/gameover.mp3");
let lever1 = new Audio("audio/lever1.mp3")

let score = 0;
let arrLife = [];
// thời gian máy bay chết
let timePlaneDeath = 0;
// New Life
for (let i = 0; i < 5; i++) {
    arrLife[i] = new Life(375 - i * 25, 5);
}

function updateMyGame() {
    mygame.clear();
    countTime++;

    // Audio lever 1
    if (score < 150) {
        lever1.volume = .1;
        lever1.play();
    }

    // sự kiện di chuyển máy bay
    if (mygame.key) {
        plane.planeMove(mygame.key);
    }
    // vẽ máy bay
    if (plane.status)
        plane.drawPlane();
    else {
        if (countTime % 5 === 0) {
            plane.drawPlane();
            timePlaneDeath++;
        }
        if (timePlaneDeath > 6) {
            plane.status = true;
            timePlaneDeath = 0;
        }
    }

    // Xử lý đạn
    if (mygame.key === 32) {
        arrbullet.push(new Bullet(plane.x + 24, plane.y));
        mySound.volume = .7;
        mySound.load();
        mySound.play();
    }
    // đạn di chuyển và vẽ ra
    for (let i = 0; i < arrbullet.length; i++) {
        arrbullet[i].bulletMove();
        arrbullet[i].drawBullet();
        if (arrbullet[i].y < 0) {
            arrbullet[i] = arrbullet[arrbullet.length - 1];
            arrbullet.pop();
        }
    }

    //Xử lý Bóng
    // bóng di chuyển và vẽ bóng
    for (let i = 0; i < arrBall.length; i++) {
        arrBall[i].ballMove();
        arrBall[i].drawBall();
    }
    // cứ sau 1s sẽ tạo ra một quả bóng
    if (countTime % 20 === 0) {
        arrBall.push(new Ball(widthBall, heightBall, speedBall));
    }
    // sau 30s bóng sẽ to hơn 
    if (countTime === 600) {
        widthBall *= 1.5;
        heightBall *= 1.5;

    }
    // sau 20s bóng sẽ di chuyển nhanh hơn
    if (countTime % 600 === 0)
        speedBall += 1;
    // bóng nổ xóa phần tử bóng, xóa đạn và  máy bay chạm bóng sẽ mất một life
    for (let j = 0; j < arrBall.length; j++) {
        for (let i = 0; i < arrbullet.length; i++) {
            if ((arrbullet[i].x + arrbullet[i].width) >= arrBall[j].x && arrbullet[i].x <= (arrBall[j].x + arrBall[j].width) &&
                (arrbullet[i].y + arrbullet[i].height) >= arrBall[j].y && arrbullet[i].y <= (arrBall[j].y + arrBall[j].height)) {
                arrBall.splice(j, 1);
                arrbullet.splice(i, 1);
                shootTrue.volume = .9;
                shootTrue.load();
                shootTrue.play();
                score++;
            }
        }
        if (plane.status) {
            if ((plane.x + plane.width) >= arrBall[j].x && plane.x <= (arrBall[j].x + arrBall[j].width) &&
                (plane.y + plane.height) >= arrBall[j].y && plane.y <= (arrBall[j].y + arrBall[j].height)) {
                arrLife.pop();
                plane.status = false;

            }
        }
    }

    // Hết mạng GameOver
    if (arrLife.length === 0)
        mygame.stop();

    // Xử lý text
    text.drawTime();
    // Tính thời gian chơi
    if (countTime % 20 === 0) {
        text.seconds++;
    }
    // Tính Score
    text.drawScore(score);
    // Xử lý Life
    for (let i = 0; i < arrLife.length; i++) {
        arrLife[i].drawLife();
    }
}

function gameOver() {
    mygame.context.font = "40px Comic Sans MS";
    mygame.context.fillStyle = "red";
    mygame.context.textAlign = "center";
    mygame.context.fillText("Game Over", mygame.canvas.width / 2, mygame.canvas.height / 2);

    mygame.context.font = "30px Comic Sans MS";
    mygame.context.fillStyle = "blue";
    mygame.context.fillText("Score: " + score, mygame.canvas.width / 2, mygame.canvas.height / 2 + 40);
    gameover.volume = .9;
    gameover.load();
    gameover.play();
    lever1.pause();
}