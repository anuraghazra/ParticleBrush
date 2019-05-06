/**
 * ParticleBrush By anuraghazra
 * @author <https://anuraghazra.github.io>
 */

const CONFIG = {
  particleCount: 10,
  gravityX: 0,
  gravityY: -0.05,
  velocity: 0.8,
  HUE: 250,
  dieSpeed: 0.03
}

window.onload = function () {
  let canvas = document.getElementById('c');
  let ctx = canvas.getContext('2d');
  const WIDTH = canvas.width = window.innerWidth;
  const HEIGHT = canvas.height = window.innerHeight;

  let gui = new dat.GUI();
  gui.add(CONFIG, 'particleCount', 0, 100, 0.01).name("Particle Count");;
  gui.add(CONFIG, 'velocity', -2, 2, 0.01).name("Velocity");
  gui.add(CONFIG, 'gravityX', -2, 2, 0.01);
  gui.add(CONFIG, 'gravityY', -2, 2, 0.01);
  gui.add(CONFIG, 'HUE', 0, 360, 1);
  gui.add(CONFIG, 'dieSpeed', 0, 0.5, 0.001).name("Die Speed");
  
  let particles = [];

  let mouse = { x: 0, y: 0 }
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });
  
  let MOUSE_DOWN = false;
  canvas.addEventListener('mousedown', function (e) {
    MOUSE_DOWN = true;
  })
  canvas.addEventListener('mouseup', function (e) {
    MOUSE_DOWN = false;
  })

  // Animation Loop
  function animate() {
    const GRAVITY = { x: CONFIG.gravityX, y: CONFIG.gravityY };

    ctx.save();
    ctx.globalCompositeOperation = 'destination-atop'
    ctx.fillStyle = 'rgba(10, 10, 10, 1)';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.restore();

    if (MOUSE_DOWN) {
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, `hsl(${Math.random() * CONFIG.HUE}, 100%, 50%)`));
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.applyForce(GRAVITY);
      p.update();
      p.render(ctx);

      if (p.isDead()) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}