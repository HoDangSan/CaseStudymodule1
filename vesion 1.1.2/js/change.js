// start
let imgStart = new Image(50, 50);
imgStart.src = 'image/start.png';
// bullet
let arrBullet = [];
let numberBullet = 1;
//ball
let arrBall = [];
let widthBall = 25;
let heightBall = 50;
let speedBall = 2;
let heartBall = 1;
let numberBall = 3;
// gift
let arrCartridge = [];
let arrFuel = [];
let arrHeart = [];
// đếm số hoạt ảnh
let countTime = 0;
//audio
let soundShoot = new Audio("audio/shoot.mp3");
let soundShootTrue = new Audio("audio/soundshoottrue.mp3");
let soundgameOver = new Audio("audio/soundgameover.mp3");
let soundLever1 = new Audio("audio/lever1.mp3");
let soundPlaneDeath = new Audio("audio/soundplanedeath.mp3");
let soundCartridge = new Audio("audio/cartridge.mp3");

let start = 0;
let lever1 = false;
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
    if (start === 0) {
        mygame.context.font = "15px Arial";
        mygame.context.fillStyle = "White";
        mygame.context.fillText("Copyright by @2019 Hồ Đăng San", 85, 550);
        mygame.context.fillText("15thxd.hodangsan@gmail.com", 95, 580);
        mygame.context.drawImage(imgStart, 100, 200, 200, 170);
        lever1 = true;
    } else {
        countTime++;
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
        if (countTime % 5 === 0) {
            if (numberBullet === 1) arrBullet.push(new Bullet(plane.x + 24, plane.y));
            else if (numberBullet === 2) {
                arrBullet.push(new Bullet(plane.x + 14, plane.y));
                arrBullet.push(new Bullet(plane.x + 34, plane.y));
            } else if (numberBullet === 3) {
                arrBullet.push(new Bullet(plane.x + 14, plane.y));
                arrBullet.push(new Bullet(plane.x + 24, plane.y));
                arrBullet.push(new Bullet(plane.x + 34, plane.y));
            }
        }
        // đạn di chuyển và vẽ ra
        for (let i = 0; i < arrBullet.length; i++) {
            arrBullet[i].bulletMove();
            arrBullet[i].drawBullet();
            if (arrBullet[i].y < 0) {
                arrBullet[i] = arrBullet[arrBullet.length - 1];
                arrBullet.pop();
            }
        }
        // Sinh ra vũ khí
        if (countTime % 800 === 0) {
            arrCartridge.push(new Cartridge());
        }
        for (let i = 0; i < arrCartridge.length; i++) {
            arrCartridge[i].cartridgeMove();
            arrCartridge[i].drawCartridge();
            if (arrCartridge[i].y > (mygame.canvas.height + arrCartridge[i].height)) {
                arrCartridge[i] = arrCartridge[arrCartridge.length - 1];
                arrCartridge.pop();
            } else
            if ((plane.x + plane.width) >= arrCartridge[i].x && plane.x <= (arrCartridge[i].x + arrCartridge[i].width) &&
                (plane.y + plane.height) >= arrCartridge[i].y && plane.y <= (arrCartridge[i].y + arrCartridge[i].height)) {
                if (numberBullet < 3) numberBullet++;
                arrCartridge[i] = arrCartridge[arrCartridge.length - 1];
                arrCartridge.pop();
                soundCartridge.volume = .9;
                soundCartridge.play();
            }
        }
        //  Sinh ra nhiên liệu mỗi 15s
        if (countTime % 300 === 0) {
            arrFuel.push(new Fuel());
        }
        for (let i = 0; i < arrFuel.length; i++) {
            arrFuel[i].fuelMove();
            arrFuel[i].drawFuel();
            if (arrFuel[i].y > (mygame.canvas.height + arrFuel[i].height)) {
                arrFuel[i] = arrFuel[arrFuel.length - 1];
                arrFuel.pop();
            } else
            if ((plane.x + plane.width) >= arrFuel[i].x && plane.x <= (arrFuel[i].x + arrFuel[i].width) &&
                (plane.y + plane.height) >= arrFuel[i].y && plane.y <= (arrFuel[i].y + arrFuel[i].height)) {
                text.fuel += arrFuel[i].value;
                text.fuel = (text.fuel > 100) ? 100 : text.fuel;
                arrFuel[i] = arrFuel[arrFuel.length - 1];
                arrFuel.pop();
            }
        }
        // Sinh heart mỗi 60s
        if (countTime % 1200 === 0) {
            arrHeart.push(new Heart());
        }
        for (let i = 0; i < arrHeart.length; i++) {
            arrHeart[i].heartMove();
            arrHeart[i].drawHeart();
            if ((plane.x + plane.width) >= arrHeart[i].x && plane.x <= (arrHeart[i].x + arrHeart[i].width) &&
                (plane.y + plane.height) >= arrHeart[i].y && plane.y <= (arrHeart[i].y + arrHeart[i].height)) {
                if (arrLife.length < 5) arrLife[arrLife.length] = new Life(375 - arrLife.length * 25, 5);
                arrHeart[i] = arrHeart[arrHeart.length - 1];
                arrHeart.pop();
            } else
            if (arrHeart[i].y > (mygame.canvas.height + arrHeart[i].height)) {
                arrHeart[i] = arrHeart[arrHeart.length - 1];
                arrHeart.pop();
            }
        }
        // Start LEVER 1
        if (lever1) {
            // Audio lever 1
            soundLever1.volume = .1;
            soundLever1.play();

            //Xử lý Bóng
            // bóng di chuyển và vẽ bóng
            for (let i = 0; i < arrBall.length; i++) {
                arrBall[i].ballMove();
                arrBall[i].drawBall();
            }
            // cứ sau 1s sẽ tạo ra lượt bóng
            if (countTime % 20 === 0) {
                for (let i = 0; i < (Math.floor(Math.random() * numberBall) + 1); i++) {
                    arrBall.push(new Ball(widthBall, heightBall, speedBall, heartBall));
                }
            }
            // sau 30s bóng sẽ to hơn nhiều hơn
            if (countTime === 600) {
                widthBall *= 1.5;
                heightBall *= 1.5;
                heartBall += 1;
                numberBall += 3;
            }
            // sau 3 phút nhiều bóng hơn nữa
            if (countTime === 3600) {
                numberBall += 2;
            }
            // sau 5p là max nhiều luôn
            if (countTime === 3600) {
                numberBall += 2;
            }
            // sau 20s bóng sẽ di chuyển nhanh hơn
            if (countTime % 400 === 0)
                speedBall += 1;
            // bóng nổ xóa phần tử bóng, xóa đạn và  máy bay chạm bóng sẽ mất một life
            for (let j = 0; j < arrBall.length; j++) {
                if (plane.status) {
                    if ((plane.x + plane.width) >= arrBall[j].x && plane.x <= (arrBall[j].x + arrBall[j].width) &&
                        (plane.y + plane.height) >= arrBall[j].y && plane.y <= (arrBall[j].y + arrBall[j].height)) {
                        arrLife.pop();
                        if (numberBullet > 1)
                            numberBullet--;
                        soundPlaneDeath.volume = .5;
                        soundPlaneDeath.play();
                        plane.status = false;

                    }
                }
                for (let i = 0; i < arrBullet.length; i++) {
                    if ((arrBullet[i].x + arrBullet[i].width) >= arrBall[j].x && arrBullet[i].x <= (arrBall[j].x + arrBall[j].width) &&
                        (arrBullet[i].y + arrBullet[i].height) >= arrBall[j].y && arrBullet[i].y <= (arrBall[j].y + arrBall[j].height)) {
                        arrBullet[i] = arrBullet[arrBullet.length - 1];
                        arrBullet.pop();
                        arrBall[j].heartBall--;
                        if (arrBall[j].heartBall === 0) {
                            arrBall[j] = arrBall[arrBall.length - 1];
                            arrBall.pop();
                            soundShootTrue.volume = .9;
                            soundShootTrue.load();
                            soundShootTrue.play();
                            score++;
                        }
                    }
                }
            }
        }
        // sau 1 phút 15s kết thúc màn 1
        // if (countTime % 1500 === 0) {
        //     soundLever1.pause();
        //     lever1 = false;
        // }


        // Hết mạng gameOver
        if (arrLife.length === 0)
            mygame.stop();

        // sau 0,5s mất một nhiên liệu
        if (countTime % 10 === 0) {
            text.fuel--;
        }
        if (text.fuel === 0) {
            mygame.stop();
        }
        text.drawFuel();
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
}

function gameOver() {
    mygame.context.font = "40px Comic Sans MS";
    mygame.context.fillStyle = "red";
    mygame.context.textAlign = "center";
    mygame.context.fillText("Game Over", mygame.canvas.width / 2, mygame.canvas.height / 2);

    mygame.context.font = "30px Comic Sans MS";
    mygame.context.fillStyle = "blue";
    mygame.context.fillText("Score: " + score, mygame.canvas.width / 2, mygame.canvas.height / 2 + 40);
    soundgameOver.volume = .9;
    soundgameOver.load();
    soundgameOver.play();
    soundLever1.pause();
}