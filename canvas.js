const canvas = document.getElementById('canv');
canvas.width = window.innerWidth;
canvas.height =window.innerHeight;
const c = canvas.getContext('2d');
const circles = [];

function Circle(x, y, dx, dy, radius, color )  {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = color;
    c.stroke();
  };

  this.animate = () => {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    } else if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy; // zmiana kierunku
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

for (let i = 0; i< 50; i++) {
  const radius = 30;
  const x = Math.random() * (window.innerWidth - radius * 2) + radius;
  const y = Math.random() * (window.innerHeight- radius * 2) + radius;
  const dx = (Math.random() - 0.5) + 4;
  const dy = (Math.random() - 0.5) + 4;
  const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
  circles.push(new Circle(x, y, dx, dy, radius, randomColor));
}
// animating
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0, innerWidth, innerHeight);
  circles.forEach(circle => circle.animate())
}
animate();

