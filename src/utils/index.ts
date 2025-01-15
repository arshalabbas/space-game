import { Rect } from "../bases/Rect";

export function randomIntInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = [
  {
    stroke: "#FEE2E2",
    fill: "#450A0A",
  },
  {
    stroke: "#DCFCE7",
    fill: "#022C22",
  },
  {
    stroke: "#DBEAFE",
    fill: "#172554",
  },
  {
    stroke: "#FAE8FF",
    fill: "#4A044E",
  },
];

export function randomColorSet() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function rectCollision(rect1: Rect, rect2: Rect) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}
