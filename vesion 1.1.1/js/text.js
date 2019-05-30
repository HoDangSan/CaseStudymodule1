class Text {
    constructor() {
        this.context = mygame.context;
        this.minute = 0;
        this.seconds = 0;
    }

    drawTime() {
        if (this.seconds > 59) {
            this.minute++;
            this.seconds = 0;
        }
        // time
        this.context.font = "15px Arial";
        this.context.fillStyle = "White";
        this.context.fillText(this.minute + " : " + this.seconds, 10, 20);
    }

    drawScore(score) {
        // score
        this.context.fillStyle = "White";
        this.context.fillText("score : " + score, 170, 20);
    }
}