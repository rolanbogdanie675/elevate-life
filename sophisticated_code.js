/**
 * sophisticated_code.js
 * 
 * Description: This code showcases a complex implementation of a simulation
 *              where particles interact with each other based on a set of rules.
 */

// Particle class
class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = this.getRandomColor();
    this.velocity = {
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
    };
    this.mass = 1;
  }

  getRandomColor() {
    const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6", "#999966"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(particles) {
    // Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    // Handle particle interaction
    for (let i = 0; i < particles.length; i++) {
      if (this === particles[i]) continue;

      if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
        resolveCollision(this, particles[i]);
      }
    }

    // Handle boundaries
    if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) {
      this.velocity.y = -this.velocity.y;
    }

    this.draw(ctx);
  }
}

// Utility functions
function getDistance(x1, y1, x2, y2) {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function resolveCollision(particle1, particle2) {
  const xVelocityDiff = particle1.velocity.x - particle2.velocity.x;
  const yVelocityDiff = particle1.velocity.y - particle2.velocity.y;
  const xDist = particle2.x - particle1.x;
  const yDist = particle2.y - particle1.y;

  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    const angle = -Math.atan2(particle2.y - particle1.y, particle2.x - particle1.x);

    const m1 = particle1.mass;
    const m2 = particle2.mass;
    const u1 = rotate(particle1.velocity, angle);
    const u2 = rotate(particle2.velocity, angle);

    const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
    const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    particle1.velocity.x = vFinal1.x;
    particle1.velocity.y = vFinal1.y;
    particle2.velocity.x = vFinal2.x;
    particle2.velocity.y = vFinal2.y;
  }
}

function rotate(velocity, angle) {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

// Setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create particles
const particles = [];
for (let i = 0; i < 100; i++) {
  const radius = Math.random() * 20 + 5;
  let x = Math.random() * (canvas.width - radius * 2) + radius;
  let y = Math.random() * (canvas.height - radius * 2) + radius;
  
  if (i !== 0) {
    for (let j = 0; j < particles.length; j++) {
      if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
        x = Math.random() * (canvas.width - radius * 2) + radius;
        y = Math.random() * (canvas.height - radius * 2) + radius;

        j = -1;
      }
    }
  }

  particles.push(new Particle(x, y, radius));
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(particle => {
    particle.update(particles);
  });
}

animate();