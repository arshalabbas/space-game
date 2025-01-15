import { randomIntInRange } from "../utils";
import { Game } from "./Game";

const star = document.querySelector("#star") as HTMLImageElement;

export class Star {
  x: number;
  y: number;
  speed: number;
  width: number;
  height: number;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.x = randomIntInRange(0, game.width);
    this.y = randomIntInRange(0, game.height);
    this.speed = randomIntInRange(0.5, 3);
    this.width = this.height = randomIntInRange(4, 8);
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(star, this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;

    if (this.y >= this.game.height) {
      this.y = 0;
      this.x = randomIntInRange(0, this.game.width);
    }
  }
}
