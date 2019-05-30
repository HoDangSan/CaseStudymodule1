class MyGame {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
        this.intervalDrawMyGame;
        this.intervalStartGame;
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
        mygame.canvas.addEventListener('click', function(e) {
            start++;
            mygame.canvas.style.cursor = "none";
        }, true)
        mygame.canvas.addEventListener('mousemove', function(e) {
            plane.x = e.clientX - mygame.canvas.offsetLeft - plane.width / 2;
            plane.y = e.clientY - mygame.canvas.offsetTop - plane.height / 2;
        }, true);
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