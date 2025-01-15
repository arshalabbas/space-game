import { Rect } from "../bases/Rect";
import { randomColorSet, randomIntInRange } from "../utils";
import { Game } from "./Game";

export class Enemy implements Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  color: { stroke: string; fill: string };

  constructor(game: Game) {
    this.width = randomIntInRange(100, 200);
    this.height = randomIntInRange(60, 100);

    this.x = randomIntInRange(0, game.width - this.width / 2);
    this.y = -this.height - 50;

    this.speed = randomIntInRange(2, 5);
    this.health = randomIntInRange(2, 4);

    this.color = randomColorSet();
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color.fill;
    ctx.strokeStyle = this.color.stroke;
    // ctx.lineWidth = 4;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
  }
}
