let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

if (window.location.hostname !== 'www.sjomli.is') {
	document.querySelector('header').remove();
}

let size = 10;
let raw = [];

function calcRow(size, func) {
	let tempRow = [];
	for (let i = 0; i < 500 / size; i++) {
		tempRow.push(func());
	}
	return tempRow;
}

for (let i = 0; i < 500 / size; i++) {
	raw.push(
		calcRow(size, () => {
			return Math.floor(Math.random() * 100);
		})
	);
}

getCalculated(raw);
function getCalculated(raw) {
    let calculated = []
	for (let i = 0; i < raw.length; i++) {
		let calcRow = [];
		for (let j = 0; j < raw[i].length; j++) {
			calcRow.push(getAvarage(i, j, raw));
		}
		calculated.push(calcRow);
	}
    return calculated;
}

function getAvarage(x, y, grid) {
	let avarage = 0;
	let divider = 1;
	for (i = -1; i <= 1; i++) {
		for (j = -1; j <= 1; j++) {
			if (grid[x + i] && grid[x + i][y + j]) {
				avarage += grid[x + i][y + j];
				divider++;
			}
		}
	}
	return avarage / divider;
}

draw(getCalculated(raw));
function draw(grid) {
	grid.forEach((val, i) => {
		val.forEach((inner, j) => {
			ctx.fillStyle = `hsl(${inner},${inner}%,${inner}%`;
			ctx.fillRect(j * size, i * size, size, size);
		});
	});
}

animate();
async function animate() {
    await new Promise(r => setTimeout(r, 50));
	raw.shift();
	raw.push(
		calcRow(size, () => {
			return Math.floor(Math.random() * 100);
		})
	);
	draw(getCalculated(raw));

	window.requestAnimationFrame(animate);
}
