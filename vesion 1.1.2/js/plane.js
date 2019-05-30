let imgPlane = new Image(50, 50);
imgPlane.src = "image/plane.png"

class Plane {
    constructor() {
        this.x = 250;
        this.y = 500;
        this.width = 50;
        this.height = 50;
        this.context = mygame.context;
        this.status = true;
    }

    drawPlane() {
        this.context.drawImage(imgPlane, this.x, this.y, this.width, this.height);
    }
}