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

    planeMove(event) {
        switch (event) {
            case 37:
                if (this.x >= 0)
                    this.x -= 10;
                break;
            case 38:
                if (this.y >= 0)
                    this.y -= 10
                break;
            case 39:
                if (this.x + this.width < 401)
                    this.x += 10
                break;
            case 40:
                if (this.y + this.height < 601)
                    this.y += 10
                break;
            default:
                break;
        }
    }
}