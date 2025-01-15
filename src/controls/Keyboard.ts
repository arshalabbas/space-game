import { Direction, Player } from "../elements/Player";

export enum Key {
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
  Space = " ",
}

export class Keyboard {
  keys: Set<string> = new Set();
  player: Player;
  constructor(player: Player) {
    this.player = player;

    document.addEventListener("keydown", (e) => {
      this.keys.add(e.key);
    });

    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.key);
    });
  }

  update() {
    if (this.keys.has(Key.ArrowLeft)) {
      this.player.direction = Direction.Left;
    } else if (this.keys.has(Key.ArrowRight)) {
      this.player.direction = Direction.Right;
    } else {
      this.player.direction = Direction.Idle;
    }

    if (this.keys.has(Key.Space)) {
      this.player.shooting = true;
    } else {
      this.player.shooting = false;
    }
  }
}
