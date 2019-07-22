// Helper variables
let canWidth = 400;
let canHeight = 501;

// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    let min = 40, max = 240; // tune these variables for upper / lower limits
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
//    this.y = Math.random()*(max-min+1)+min;
//    let firstRow = 60, secondRow = 140, thirdRow = 220;
    let rowY = [60, 140, 220]
    let rowNum = Math.ceil(Math.random()*3 - 1);
//    if (rowNum == 3) rowNum--;
    this.y = rowY[rowNum];
    this.speed = 100;
    this.width = 10;
    this.height = 10;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + dt * this.speed;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let count = 1;
Enemy.prototype.checkCollisions = function(player) {
//    console.log(player.width);
    if (player.y > -19) {
        if (player.x < this.x + this.width  && player.x + player.width  > this.x &&
            player.y < this.y + this.height && player.y + player.height > this.y)
        {
//            console.log(`collision ${count++}`);
            player.update("init");
        }
    }
};

// Now write your own player class
let Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = canWidth / 2;
    this.y = canHeight - 130;
    this.width = 101;
    this.height = 171;
}
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
    let movex = 100;
    let movey = 78;
    switch (dt) {
        case "init":
            this.x = canWidth / 2 + 100;
            this.y = canHeight - 130;
        case "left":
            if (this.x > 0)
                this.x = this.x - movex;
            break;
        case "up":
            if (this.y > -19)
                this.y = this.y - movey;
            else {
                alert("You win!");
                this.y = 371;
                count = 0;
            }
            break;
        case "right":
            if (this.x < 400)
                this.x = this.x + movex;
            break;
        case "down":
            if (this.y < 371)
                this.y = this.y + movey;
            break;
    };
//    console.log(`${this.x}, ${this.y}`)
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//    console.log(`${ctx.canvas.width}, ${ctx.canvas.height}`);
};

Player.prototype.handleInput = function(keyCode) {
    player.update(keyCode);    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
setInterval(function() {
    let enemy = new Enemy;
    allEnemies.push(enemy);
    collide(enemy);
}, 1500);
// Place the player object in a variable called player
let player = new Player();

function collide(enemy) {
    setInterval(function() {
        enemy.checkCollisions(player);
    }, 1);
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
