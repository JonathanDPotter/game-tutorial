import { detectCollision } from "./collisionDetection";

export default class Ball {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.ball = document.getElementById("img-ball");
    this.size = 16;
    this.game = game;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400 };
    this.speed = { x: 4, y: -2 };
  }

  draw(ctx) {
    ctx.drawImage(
      this.ball,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update(deltaTime) {
    // move ball
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // detect side wall collisions
    if (this.position.x >= this.gameWidth - this.size || this.position.x <= 0)
      this.speed.x = -this.speed.x;
    // detect top collisions
    if (this.position.y <= 0) this.speed.y = -this.speed.y;
    // detect bottom collisions
    if (this.position.y + this.size > this.gameHeight) {
      this.game.lives--;
      this.reset();
    }
    if (detectCollision(this, this.game.paddle)) this.speed.y = -this.speed.y;
  }
}
