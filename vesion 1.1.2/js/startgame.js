let mygame;
let plane;
let text;
window.onload = function() {
    // New Mygame
    mygame = new MyGame();
    plane = new Plane();
    text = new Text();

    mygame.init();

    document.getElementById("again").onclick = function() {
        location.reload();
    }
}