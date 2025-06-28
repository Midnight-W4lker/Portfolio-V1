// import React, { useEffect, useRef } from 'react';
// import './styles/ParticleBackground.css'; // Ensure you have this CSS file for styling

// const ParticleBackground = () => {
//   const canvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const particlesRef = useRef([]);
//   const mouseRef = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     let particles: Particle[] = [];

//     // Set canvas size
//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };

//     resizeCanvas();
//     window.addEventListener('resize', resizeCanvas);

//     // Particle class
//     class Particle {
//       x: number;
//       y: number;
//       z: number;
//       vx: number;
//       vy: number;
//       rotation: number;
//       rotationSpeed: number;
//       baseSize: number;
//       opacity: number;
//       fadeDelay: number;
//       fadeStart: number;
//       fadingOut: boolean;
//       twinkle: number;
//       twinkleSpeed: number;

//       constructor() {
//         this.reset();
//         this.y = Math.random() * canvas.height;
//         this.fadeDelay = Math.random() * 600;
//         this.fadeStart = Date.now() + this.fadeDelay;
//         this.fadingOut = false;
//       }

//       reset() {
//         this.x = Math.random() * canvas.width;
//         this.y = Math.random() * canvas.height;
//         this.z = Math.random() * 20 + 1;
//         this.vx = (Math.random() - 0.5) * 0.2;
//         this.vy = (Math.random() - 0.5) * 0.2;
//         this.rotation = Math.random() * Math.PI * 2;
//         this.rotationSpeed = (Math.random() - 0.5) * 0.02;
//         // Different sizes for star-like effect - smaller base size
//         this.baseSize = Math.random() * 6 + 1; // 1-7px stars
//         this.opacity = Math.random() * 0.8 + 0.2; // More visible
//         this.fadeDelay = Math.random() * 600;
//         this.fadeStart = Date.now() + this.fadeDelay;
//         this.fadingOut = false;
//         this.twinkle = Math.random() * Math.PI * 2;
//         this.twinkleSpeed = Math.random() * 0.02 + 0.01;
//       }

//       update() {
//         // Mouse interaction
//         const dx = mouseRef.current.x - this.x;
//         const dy = mouseRef.current.y - this.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         const maxDistance = 150;

//         if (distance < maxDistance) {
//           const force = (maxDistance - distance) / maxDistance;
//           this.vx -= (dx / distance) * force * 0.01;
//           this.vy -= (dy / distance) * force * 0.01;
//         }

//         // Apply velocity with spread effect
//         this.x += this.vx * 10;
//         this.y += this.vy * 10;

//         // Rotation
//         this.rotation += this.rotationSpeed;

//         // Twinkle effect
//         this.twinkle += this.twinkleSpeed;

//         // Boundary wrapping
//         if (this.x < -10) this.x = canvas.width + 10;
//         if (this.x > canvas.width + 10) this.x = -10;
//         if (this.y < -10) this.y = canvas.height + 10;
//         if (this.y > canvas.height + 10) this.y = -10;

//         // Fade effect
//         if (Date.now() > this.fadeStart && !this.fadingOut) {
//           this.fadingOut = true;
//         }

//         if (this.fadingOut) {
//           this.opacity -= 0.005;
//           if (this.opacity <= 0) {
//             this.reset();
//           }
//         }

//         // Damping
//         this.vx *= 0.99;
//         this.vy *= 0.99;
//       }

//       draw() {
//         ctx.save();
//         ctx.translate(this.x, this.y);
//         ctx.rotate(this.rotation);
        
//         // Twinkle effect on opacity
//         const twinkleOpacity = this.opacity * (0.5 + 0.5 * Math.sin(this.twinkle));
//         ctx.globalAlpha = twinkleOpacity;

//         // Simple white circle for star
//         ctx.fillStyle = 'white';
//         ctx.beginPath();
//         ctx.arc(0, 0, this.baseSize, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.restore();
//       }
//     }

//     // Initialize particles
//     for (let i = 0; i < 700; i++) {
//       particles.push(new Particle());
//     }

//     particlesRef.current = particles;

//     // Mouse move handler
//     const handleMouseMove = (e) => {
//       mouseRef.current.x = e.clientX;
//       mouseRef.current.y = e.clientY;
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     // Animation loop
//     const animate = () => {
//       // Clear canvas with solid dark background
//       ctx.fillStyle = '#0a0a0a'; // Very dark background like the image
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       particles.forEach(particle => {
//         particle.update();
//         particle.draw();
//       });

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animate();

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', resizeCanvas);
//       window.removeEventListener('mousemove', handleMouseMove);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full pointer-events-none particle-canvas -z-10"
//     />
//   );
// };

// export default ParticleBackground;