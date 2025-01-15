import { Rect } from "../bases/Rect";
import { Game } from "./Game";
import { Projectile } from "./Projectile";

const ship = document.querySelector("#ship") as HTMLImageElement;

export enum Direction {
  Left = -1,
  Right = 1,
  Idle = 0,
}

export class Player implements Rect {
  game: Game;
  x: number;
  y: number;
  width: number = 50;
  height: number = 50;
  direction: Direction = Direction.Idle;
  speed: number = 5;
  shooting: boolean = false;
  lastShotTime = 0;
  shootInterval = 200;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(ship, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.speed * this.direction;
    this.x = Math.max(0, Math.min(this.x, this.game.canvas.width - this.width));

    if (this.shooting) {
      const currentTime = Date.now();
      if (currentTime - this.lastShotTime >= this.shootInterval) {
        this.game.projectiles.push(new Projectile(this));
        this.lastShotTime = currentTime;
      }
    }
  }
}
