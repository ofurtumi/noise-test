import { getMousePos } from "./lib/utils.js";

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

let dim = { w: canvas.width, h: canvas.height };

let width = 3;
const widths = [1, 2, 5, 10, 20, 50, 100, 250]

generateGrid(widths[width])
document.querySelector("#in").addEventListener("click", () => {
  generateGrid(width < widths.length-1 ? widths[++width] : widths[width]);
});
document.querySelector("#out").addEventListener("click", () => {
  generateGrid(width > 0 ? widths[--width] : widths[width])
});

function generateGrid(width) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, dim.w, dim.h);
  for (let y = 0; y < dim.h; y += width) {
    for (let x = 0; x < dim.w; x += width) {
      ctx.fillStyle = getRandomColor();
      ctx.fillRect(x, y, width, width);
    }
  }
}


function getRandomColor() {
  let val = Math.floor(Math.random() * 255);
  let out = `rgb(${val},${val},${val})`;
  return out;
}
