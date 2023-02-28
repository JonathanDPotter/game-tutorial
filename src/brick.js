import {
  detectVerticalCollision,
  detectHorizontalCollision,
} from "./collisionDetection";

export default class Brick {
  constructor(game, position) {
    this.game = game;
    this.image = document.getElementById("img-brick");
    this.position = position;
    this.width = 80;
    this.height = 24;
    this.markedForDeletion = false;
  }

  update() {
    if (detectHorizontalCollision(this.game.ball, this)) {
      this.game.ball.speed.x = -this.game.ball.speed.x;
      this.markedForDeletion = true;
    }
    
    if (detectVerticalCollision(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
