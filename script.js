import { getMousePos } from './lib/utils.js';

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = 3;
const widths = [1, 2, 5, 10, 20, 50, 100, 250];
let grid;

document.querySelector('#in').addEventListener('click', () => {
	grid = generateGrid(
		width < widths.length - 1 ? widths[++width] : widths[width]
	);
	draw(grid, widths[width], median, color);
});
document.querySelector('#out').addEventListener('click', () => {
	grid = generateGrid(width > 0 ? widths[--width] : widths[width]);
	draw(grid, widths[width], median, color);
});

let median = true;
document.querySelector('#generate').addEventListener('change', () => {
	median = !median;
	draw(grid, widths[width], median, color);
});

let color = true;
document.querySelector('#color').addEventListener('change', () => {
	color = !color;
	draw(grid, widths[width], median, color);
});

grid = generateGrid(widths[width]);
draw(grid, widths[width], median, color);

function generateGrid(width) {
	let grid = [];
	for (let y = 0; y < canvas.height; y += width) {
		let row = [];
		for (let x = 0; x < canvas.width; x += width) {
			row.push(Math.round(Math.random() * 100));
		}
		grid.push(row);
	}
	return grid;
}

function betterMedian(x, y, grid) {
	let total = 0;
	for (let i = -1; i <= 1; i++) {
		if (grid[y + i]) {
			for (let j = -1; j <= 1; j++) {
				if (grid[y + i][x + j]) total += grid[y + i][x + j];
				else total += Math.round(Math.random() * 100);
			}
		} else {
			total += Math.round(Math.random() * 100) * 3;
		}
	}
	return Math.round(total / 9);
}

function draw(grid, width, median, color) {
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid.length; j++) {
			if (!median) {
				ctx.fillStyle = color
					? 'hsl(' + grid[i][j] * 4 + ',80%,40%)'
					: 'hsl(0,0%,' + grid[i][j] + '%)';
			} else {
				ctx.fillStyle = color
        	? 'hsl(' + betterMedian(i, j, grid) * 4 + ',80%,40%)'
					: 'hsl(0,0%,' + betterMedian(i, j, grid) + '%)';
			}
			ctx.fillRect(i * width, j * width, width, width);
		}
	}
}
