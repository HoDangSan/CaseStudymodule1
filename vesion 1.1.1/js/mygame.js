class MyGame {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.intervalDrawMyGame;
        this.key;
    }

    init() {
        this.intervalDrawMyGame = setInterval(updateMyGame, 50);
        window.addEventListener('keydown', function(e) {
            mygame.key = e.keyCode;
        })
        window.addEventListener('keyup', function(e) {
            mygame.key = false;
        })
        if (mygame.key === 13) {
            location.reload();
        }
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    stop() {
        clearInterval(this.intervalDrawMyGame);
        this.clear();
        setTimeout(gameOver, 100);
    }
}