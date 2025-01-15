import { Rect } from "../bases/Rect";
import { Player } from "./Player";

export class Projectile implements Rect {
  x: number;
  y: number;
  width: number = 4;
  height: number = 14;
  speed: number = 20;

  constructor(player: Player) {
    this.x = player.x + player.width / 2 - this.width / 2;
    this.y = player.y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y -= this.speed;
  }
}
