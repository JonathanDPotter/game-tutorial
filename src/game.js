import Inputhandler from "./input";
import Paddle from "./paddle";
import Ball from "./ball";
import Brick from "./brick";
import { buildLevel, levelOne, levelTwo } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEW_LEVEL: 4,
};

const livesDisplay = document.getElementById("lives");

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gameState = GAMESTATE.MENU;
    this.gameObjects = [];
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.bricks = [];
    this.lives = 3;
    this.levels = [levelOne, levelTwo];
    this.currentLevel = 0;
    new Inputhandler(this.paddle, this);
  }

  start() {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.RUNNING
    )
      return;

    this.gameState = GAMESTATE.RUNNING;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);

    this.ball.reset();

    this.gameObjects = [this.paddle, this.ball];
  }

  update(deltaTime) {
    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel = this.currentLevel + 1;
      this.gameState = GAMESTATE.NEW_LEVEL;
      this.start();
    }

    livesDisplay.textContent = `Lives ${this.lives}`;

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
    
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, .5)";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "#000";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press Space Bar to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "#000";
      ctx.fill();

      ctx.font = "30px Arial";
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gameState === GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else if (this.gameState === GAMESTATE.RUNNING)
      this.gameState = GAMESTATE.PAUSED;
  }
}
