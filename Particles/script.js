    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const body = document.body;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const mouse = {
      x: null,
      y: null
    };

    window.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
      }
    });

    window.addEventListener("click", () => {
  const hue = Math.floor(Math.random() * 360);
  body.style.background = `hsl(${hue}, 40%, 10%)`;
  for (let i = 0; i < 30; i++) {
    particlesArray.push(new Particle(mouse.x, mouse.y, true));
  }
});

    class Particle {
  constructor(x = mouse.x, y = mouse.y, explode = false) {
        this.x = x;
    this.y = y;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * (explode ? 10 : 2);
        this.speedY = (Math.random() - 0.5) * (explode ? 10 : 2);
        this.color = `hsl(${270 + Math.random() * 60}, 80%, 80%)`;
        this.shadow = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.shadow;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function handleParticles() {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (particlesArray[i].size < 0.5) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
    }

    animate();