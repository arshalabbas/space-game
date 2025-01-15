import { Game } from "./Game";

export class UI {
  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  render(ctx: CanvasRenderingContext2D) {
    // Score
    ctx.fillStyle = "#fff";
    ctx.font = "24px impact";
    ctx.fillText(this.game.score.toFixed().toString().padStart(6, "0"), 20, 50);

    // Level
    ctx.fillText(`Level ${this.game.level}`, this.game.width - 100, 50);
  }
}
