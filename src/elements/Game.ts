import { Keyboard } from "../controls/Keyboard";
import { rectCollision } from "../utils";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
import { Projectile } from "./Projectile";
import { Star } from "./Star";

export class Game {
  // Canvas configurations
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number = 550;
  height: number = 550;
  keyboard: Keyboard;

  // Player Config
  player: Player;

  // Enemy Config
  lastEnemySpawnedOn: number = 0;
  enemySpawnInterval: number = 1500;

  // Elemets
  projectiles: Projectile[] = [];
  enemies: Enemy[] = [];
  stars: Star[] = [];

  // States
  gameOver: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.player = new Player(
      this,
      this.canvas.width / 2,
      this.canvas.height - 100
    );
    this.keyboard = new Keyboard(this.player);

    for (let i = 0; i < 400; i++) {
      this.stars.push(new Star(this));
    }
  }

  render() {
    // Layer 0 (Background)
    this.stars.forEach((star) => star.render(this.ctx));

    // Layer 1 (Player)
    this.player.render(this.ctx);

    // Layer 2 (Projectiles)
    this.projectiles.forEach((projectile) => {
      projectile.render(this.ctx);
    });

    // Layer 3 (Enemies)
    this.enemies.forEach((enemy) => {
      enemy.render(this.ctx);
    });
  }

  update() {
    if (this.gameOver) {
      alert("Game Over my dear! 😭");
      return;
    }
    this.player.update();
    this.keyboard.update();

    this.stars.forEach((star) => star.update());

    // Spawn enemies
    let currentTime = Date.now();
    if (currentTime - this.lastEnemySpawnedOn >= this.enemySpawnInterval) {
      this.enemies.push(new Enemy(this));
      this.lastEnemySpawnedOn = currentTime;
    }

    // Update projectiles
    this.projectiles.forEach((projectile, index) => {
      if (projectile.y <= 0) {
        this.projectiles.splice(index, 1);
      }

      this.enemies.forEach((enemy, j) => {
        if (rectCollision(projectile, enemy)) {
          enemy.health--;
          enemy.height -= enemy.height / 3;
          if (enemy.health <= 0) {
            this.enemies.splice(j, 1);
          }
          this.projectiles.splice(index, 1);
        }
      });
      projectile.update();
    });

    // Update enemies
    this.enemies.forEach((enemy, index) => {
      if (enemy.y >= this.canvas.height + enemy.height) {
        this.enemies.splice(index, 1);
      }

      if (rectCollision(enemy, this.player)) {
        console.log("Game is over");
        this.gameOver = true;
      }
      enemy.update();
    });
  }
}
