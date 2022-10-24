const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const size = 50;

let positions = [1, 2, 3, 4];
const imgs = positions.map((p) => {
  img = new Image(size, size);
  img.src = "sprites/s" + p + ".png";
  return img;
});
console.table(imgs);

window.onload = async () => {
  for (let y = 0; y < size * 10; y += size) {
    for (let x = 0; x < size * 10; x += size) {
      let randImg = Math.floor(Math.random() * 4);
      ctx.drawImage(imgs[randImg], x, y, size, size);
      await new Promise((r) => setTimeout(r, size));
    }
  }
};

// ? tekur stöðu útfrá typpinu
// ? núllstillt í klukkuröð?? heitir það það?? up: 0, right: 1 osfr...
// ? 4 er tómi kassinn
// prettier-ignore
const possibilities = {
    'up': {
        'up':       [1,2,3],
        'right':    [0,2,3],
        'down':     [0,4],
        'left':     [0,1,2,3]
    },
    'right': {
        'up':       [1,2,3],
        'right':    [0,2,3],
        'down':     [0,1,3],
        'left':     [3,4]
    }
}
