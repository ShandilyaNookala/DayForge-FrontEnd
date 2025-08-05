import { useEffect, useRef } from "react";
import styles from "./Bubbles.module.css";

export default function Bubbles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Bubble {
      constructor() {
        this.reset();
      }
      reset() {
        this.radius = random(16, 48);
        this.x = random(this.radius, canvas.width - this.radius);
        this.y = canvas.height + this.radius * random(0.05, 0.5);
        this.speed = random(1.1, 2.5);
        this.drift = random(-0.8, 0.8);
        this.alpha = random(0.45, 0.9);
        this.border = random(2, 4);
        this.color = [
          `rgba(180,240,255,${this.alpha})`,
          `rgba(58,175,169,${this.alpha * 0.8})`,
          `rgba(255,255,255,${this.alpha * 0.85})`,
        ][Math.floor(random(0, 3))];
      }
      update() {
        this.y -= this.speed;
        this.x += this.drift;
        if (
          this.y + this.radius < 0 ||
          this.x < -this.radius ||
          this.x > canvas.width + this.radius
        ) {
          this.reset();
        }
      }
      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(
          this.x - this.radius * 0.4,
          this.y - this.radius * 0.4,
          this.radius * 0.25,
          this.x,
          this.y,
          this.radius,
        );
        grad.addColorStop(0, "rgba(255,255,255,0.75)");
        grad.addColorStop(0.2, this.color);
        grad.addColorStop(0.7, "rgba(80,200,255,0.18)");
        grad.addColorStop(1, "rgba(255,255,255,0.09)");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 0.55;
        ctx.lineWidth = this.border;
        ctx.strokeStyle = "rgba(255,255,255,0.8)";
        ctx.stroke();
        ctx.restore();
      }
    }

    const bubbles = [];
    const bubbleCount = 18;
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push(new Bubble());
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const bubble of bubbles) {
        bubble.update();
        bubble.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.bubbleCanvas} />;
}
