import utils from './utils';

const canvas = document.getElementById('canv');
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight -  20;
const c = canvas.getContext('2d');
const circlesCount = 100;
const circles = [];

function Circle(x, y, dx, dy, radius, color )  {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.fillStyle = color;
    c.fill();
    c.stroke();
  };

  this.animate = () => {
    const accelerator = 1;
    const resistance = 0.9;
    if(this.x + this.radius + this.dx >= canvas.width || this.x + this.radius <= 0 ) {
      this.dx = -this.dx * (resistance - 0.4);
    }
    if (this.y + this.radius + this.dy >= canvas.height) {
      this.dy = -this.dy * resistance; // change direction + add air resistance
    } else {
      this.dy += accelerator;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

for (let i = 0; i< circlesCount; i++) {
  const radius = utils.randomIntFromRange(5, 40);
  const x = utils.randomIntFromRange(radius, canvas.width - radius);
  const y = utils.randomIntFromRange(radius, canvas.height - radius);
  const dx = utils.randomIntFromRange(-3, 3);
  const dy = utils.randomIntFromRange(-3, 4);
  const randomColor = utils.randomColor();
  circles.push(new Circle(x, y, dx, dy, radius, randomColor));
}
// animating
const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);
  circles.forEach(circle => circle.animate())
};

const changeDirection = () => {
  circles.forEach(circle => {
    circle.dx = -circle.dx + utils.randomIntFromRange(1, 3);
    circle.dy = -circle.dy + utils.randomIntFromRange(1, 30);
  })
};
// animate();
window.addEventListener('load', animate);

window.addEventListener('click', changeDirection);