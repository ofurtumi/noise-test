let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

if (window.location.hostname !== 'www.sjomli.is') {
	document.querySelector('header').remove();
}

let size = 10;
let raw = [];

multi1 = 1;
document.querySelector("#multi1").addEventListener("input", (e) => {multi1 = e.target.value})
multi2 = 1;
document.querySelector("#multi2").addEventListener("input", (e) => {multi2 = e.target.value})
multi3 = 1;
document.querySelector("#multi3").addEventListener("input", (e) => {multi3 = e.target.value})

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
	let calculated = [];
	for (let i = 0; i < raw.length; i++) {
		// calculated.push()
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
			ctx.fillStyle = `hsl(${inner*multi1},${inner*multi2}%,${inner*multi3}%`;
			ctx.fillRect(j * size, i * size, size, size);
		});
	});
}

animate();
async function animate() {
	await new Promise(r => setTimeout(r, 50));
	// await new Promise((r) => setTimeout(r, 2000));
	// console.log(raw.shift());
	raw = raw.slice(1);
	raw.push(
		calcRow(size, () => {
			return Math.floor(Math.random() * 100);
		})
	);
	draw(getCalculated(raw));

	window.requestAnimationFrame(animate);
}
