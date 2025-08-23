/* eslint-disable react/prop-types */
// import { useEffect, useRef } from "react";
// import { useSelector } from "react-redux";

// const Particles = () => {
//   const canvasRef = useRef(null);
//   const particlesArray = useRef([]);
//   const animationFrameRef = useRef(null);
//   const lastCanvasSize = useRef({ width: 0, height: 0 });
//   const theme = useSelector((state) => state.theme.theme);

//   class Particle {
//     constructor(canvas) {
//       this.canvas = canvas;
//       this.x = Math.random() * canvas.width;
//       this.y = Math.random() * canvas.height;
//       this.size = Math.random() * 3 + 1;
//       this.baseSpeed = 0.5; // Velocidad constante fija
//       this.speedX = (Math.random() - 0.5) * this.baseSpeed; // Velocidad fija al inicio
//       this.speedY = (Math.random() - 0.5) * this.baseSpeed; // Velocidad fija al inicio
//     }

//     update() {
//       this.x += this.speedX;
//       this.y += this.speedY;
//       if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1; // Solo cambia dirección al rebotar
//       if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1; // Solo cambia dirección al rebotar
//     }

//     draw(ctx, theme) {
//       ctx.fillStyle = theme === "light" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)";
//       ctx.beginPath();
//       ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   const initParticles = (canvas) => {
//     particlesArray.current = [];
//     const particleCount = Math.max(10, Math.floor((canvas.width * canvas.height) / 8000));
//     for (let i = 0; i < particleCount; i++) {
//       particlesArray.current.push(new Particle(canvas));
//     }
//     lastCanvasSize.current = { width: canvas.width, height: canvas.height };
//   };

//   const animate = (ctx, canvas) => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     particlesArray.current.forEach((p) => {
//       p.update();
//       p.draw(ctx, theme);
//     });
//     lastCanvasSize.current = { width: canvas.width, height: canvas.height };
//     animationFrameRef.current = requestAnimationFrame(() => animate(ctx, canvas));
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const resizeCanvas = () => {
//       const newWidth = canvas.offsetWidth;
//       const newHeight = canvas.offsetHeight;
//       if (newWidth > 0 && newHeight > 0) {
//         const oldWidth = canvas.width;
//         const oldHeight = canvas.height;
//         canvas.width = newWidth;
//         canvas.height = newHeight;

//         if (
//           particlesArray.current.length === 0 ||
//           Math.abs(oldWidth - newWidth) > 10 ||
//           Math.abs(oldHeight - newHeight) > 10
//         ) {
//           initParticles(canvas);
//         } else {
//           particlesArray.current.forEach((p) => {
//             // Ajusta posiciones proporcionalmente sin alterar velocidad
//             p.x = (p.x / oldWidth) * newWidth;
//             p.y = (p.y / oldHeight) * newHeight;
//             p.canvas = canvas;
//           });
//         }
//         animate(ctx, canvas);
//       }
//     };

//     resizeCanvas();

//     const handleResize = () => {
//       cancelAnimationFrame(animationFrameRef.current);
//       resizeCanvas();
//     };

//     window.addEventListener("resize", handleResize);
//     const resizeObserver = new ResizeObserver(handleResize);
//     resizeObserver.observe(canvas.parentElement);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       resizeObserver.disconnect();
//       cancelAnimationFrame(animationFrameRef.current);
//     };
//   }, );

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute top-0 left-0 w-full h-full"
//       style={{ zIndex: 0 }}
//     />
//   );
// };

// export default Particles;


import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Particles = () => {
  const canvasRef = useRef(null);
  const particlesArray = useRef([]);
  const animationFrameRef = useRef(null);
  const lastCanvasSize = useRef({ width: 0, height: 0 });
  const mouse = useRef({ x: null, y: null, radius: 100 }); // Radio de interacción con el mouse
  const theme = useSelector((state) => state.theme.theme);

  class Particle {
    constructor(canvas) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1;
      this.baseSpeed = 0.5; // Velocidad constante fija
      this.speedX = (Math.random() - 0.5) * this.baseSpeed; // Velocidad fija al inicio
      this.speedY = (Math.random() - 0.5) * this.baseSpeed; // Velocidad fija al inicio
    }

    update() {
      // Movimiento constante y rebote en los bordes
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > this.canvas.width) this.speedX *= -1; // Rebote horizontal
      if (this.y < 0 || this.y > this.canvas.height) this.speedY *= -1; // Rebote vertical

      // Interacción con el mouse
      if (mouse.current.x !== null && mouse.current.y !== null) {
        let dx = this.x - mouse.current.x;
        let dy = this.y - mouse.current.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.current.radius;

        // Aplicar repulsión si el mouse está cerca
        if (distance < maxDistance) {
          let force = (maxDistance - distance) / maxDistance; // Fuerza normalizada
          let forceX = (dx / distance) * force * 10; // Fuerza de repulsión
          let forceY = (dy / distance) * force * 10;
          this.x += forceX;
          this.y += forceY;
        }
      }
    }

    draw(ctx, theme) {
      ctx.fillStyle =
        theme === "light" ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const initParticles = (canvas) => {
    particlesArray.current = [];
    const particleCount = Math.max(
      10,
      Math.floor((canvas.width * canvas.height) / 8000)
    );
    for (let i = 0; i < particleCount; i++) {
      particlesArray.current.push(new Particle(canvas));
    }
    lastCanvasSize.current = { width: canvas.width, height: canvas.height };
  };

  const animate = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.current.forEach((p) => {
      p.update();
      p.draw(ctx, theme);
    });
    lastCanvasSize.current = { width: canvas.width, height: canvas.height };
    animationFrameRef.current = requestAnimationFrame(() =>
      animate(ctx, canvas)
    );
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      const newWidth = canvas.offsetWidth;
      const newHeight = canvas.offsetHeight;
      if (newWidth > 0 && newHeight > 0) {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        canvas.width = newWidth;
        canvas.height = newHeight;

        if (
          particlesArray.current.length === 0 ||
          Math.abs(oldWidth - newWidth) > 10 ||
          Math.abs(oldHeight - newHeight) > 10
        ) {
          initParticles(canvas);
        } else {
          particlesArray.current.forEach((p) => {
            // Ajusta posiciones proporcionalmente sin alterar velocidad
            p.x = (p.x / oldWidth) * newWidth;
            p.y = (p.y / oldHeight) * newHeight;
            p.canvas = canvas;
          });
        }
        animate(ctx, canvas);
      }
    };

    resizeCanvas();

    // Manejar movimiento del mouse
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = event.clientX - rect.left;
      mouse.current.y = event.clientY - rect.top;
    };

    // Agregar eventos
    canvas.addEventListener("mousemove", handleMouseMove);
    const handleResize = () => {
      cancelAnimationFrame(animationFrameRef.current);
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement);

    // Limpiar eventos al desmontar
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameRef.current);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ zIndex: 0, pointerEvents: "auto" }}
    />
  );
};

export default Particles;