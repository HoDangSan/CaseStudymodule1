let imgBall = new Image(25, 50);
imgBall.src = "image/ball.png";

class Ball {
    constructor(width, height, speed) {
        this.context = mygame.context;
        this.x = Math.random() * 350; // Math.floor(Math.round() * 400);
        this.y = -100;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }

    drawBall() {
        this.context.drawImage(imgBall, this.x, this.y, this.width, this.height);
    }
    ballMove() {
        if (this.x < 0 || this.x > 401)
            this.speedX = -this.speedX;
        this.y += this.speed;
        if (this.y > 600) {
            this.y = -10;
            this.x = Math.random() * 800;
        }
    }
}