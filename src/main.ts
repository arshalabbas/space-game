import { Game } from "./elements/Game";
import "./style.css";

const canvas = document.querySelector("#game") as HTMLCanvasElement;

const game = new Game(canvas);

const run = () => {
  game.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  game.ctx.fillRect(0, 0, canvas.width, canvas.height);
  game.render();
  game.update();
  requestAnimationFrame(run);
};

run();
