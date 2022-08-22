let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = 4;
const widths = [1, 2, 5, 10, 20, 50, 100, 250];
let grids;

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
	draw(grids, widths[width], median, color);
});

let color = true;
document.querySelector('#color').addEventListener('change', () => {
	color = !color;
	draw(grids, widths[width], median, color);
});

grids = generateGrid(widths[width]);
draw(grids, widths[width], median, color);

function generateGrid(width) {
	let grid = [];
	for (let y = 0; y < canvas.height; y += width) {
		let row = [];
		for (let x = 0; x < canvas.width; x += width) {
			let rand = Math.round(Math.random() * 100);
			// console.log('rand, x, y --> ', rand, x, y);
			row.push(rand);
		}
		grid.push(row);
	}
	// console.log('grid --> ', grid)

	let calculated = [];
	for (let i = 0; i < grid.length; i++) {
		let calcRow = [];
		for (let j = 0; j < grid[i].length; j++) {
			calcRow.push(betterMedian(i, j, grid));
		}
		calculated.push(calcRow);
	}

	return { raw: grid, calc: calculated };
}

function betterMedian(x, y, grid) {
	let total = 0;
	for (let i = -1; i <= 1; i++) {
		if (grid[y + i]) {
			for (let j = -1; j <= 1; j++) {
				if (grid[y + i][x + j]) total += grid[y + i][x + j];
				// else total += Math.round(Math.random() * 100);
				else total = 0;
			}
		} else {
			// total += Math.round(Math.random() * 100) * 3;
			total = 0;
		}
	}
	return Math.round(total / 9);
}

function draw(grids, width, median, color) {
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < grids.raw.length; i++) {
		for (let j = 0; j < grids.raw[i].length; j++) {
			if (!median) {
				ctx.fillStyle = color
					? 'hsl(' + grids.raw[i][j] + ',80%,40%)'
					: 'hsl(0,0%,' + grids.raw[i][j] + '%)';
			} else {
				ctx.fillStyle = color
					? 'hsl(' + grids.calc[i][j] + ',80%,40%)'
					: 'hsl(0,0%,' + grids.calc[i][j] + '%)';
			}
			ctx.fillRect(i * width, j * width, width, width);
		}
	}
}

if (window.location.hostname !== 'www.sjomli.is') {
	document.querySelector('header').remove();
}

// animate()
console.log('grids --> ', grids);
function animate() {
	draw(grids, widths[width], median, color);
	window.requestAnimationFrame(animate);
}

function calculateRow() {}
