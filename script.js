function Canvas(id, w, h) {
    var c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    c.id = id;
    return c;
}

function Player(x, y, bullets) {
    this.x = x;
    this.y = y;
    
    this.shoot = () => {
        var bullet = new Bullet(this.x, this.y);
        bullets.push(bullet);
    }
    this.move = (event) => {
        this.x = event.clientX - 10;
        this.y = event.clientY - 10;
        this.shoot();
    }
}

function Bullet(x, y) {
    var a = 0;
    this.x = x;
    this.y = y;
    this.move = () => {
        this.y += 1 + a;
        a += 0.20;
    }
}

function update(ctx, c, p, bullets) {
    var alfabeto = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return function draw() {
        var b = [];
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, c.width, c.height);
        bullets.forEach((element, i, bullets) => {
            var m = Math.floor(i / alfabeto.length);
            if (element !== null) {
                if (element.y < c.height - 3)
                    element.move();
                ctx.font = "30px Calibri";
                ctx.strokeText((alfabeto[i - alfabeto.length * m]).toString(), element.x, element.y);
                if (element.y > c.height - 3)
                    bullets[i].y = c.height;
                // if (element.y <= 0)
                //     bullets[i] = null;
                if (bullets[0] === null)
                    bullets.shift();
            }
        });
        b = bullets.filter(e => e !== null);
        ctx.font = "20px Calibri";
        ctx.fillText("B: " + b.length.toString(), 10, 25);
        ctx.fillText("Bullets: " + bullets.length.toString(), 10, 50);
    }
}



function init() {
    var bullets = [];
    var c = new Canvas("canvas", 300, 300);
    document.body.appendChild(c);
    var ctx = c.getContext("2d");
    var p = new Player(0, 0, bullets);
    window.onmouseup = () => window.onmousemove = null;
    window.onmousedown = () => window.onmousemove = p.move;
    update(ctx, c, p, bullets)();
}

window.onload = init;

