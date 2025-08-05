import { useEffect, useRef, useState } from "react";
import styles from "./Bubbles.module.css";
import { bubbleCount } from "../../utils/config";

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createBubble(containerWidth, containerHeight) {
  const radius = random(16, 48);
  const x = random(radius, containerWidth - radius);
  const y = containerHeight + radius * random(0.05, 0.5);
  const speed = random(0.6, 1.5);
  const drift = random(-0.8, 0.8);
  const alpha = random(0.45, 0.9);
  const border = random(2, 4);
  const colorIdx = Math.floor(random(0, 3));
  const colors = [
    `rgba(180,240,255,${alpha})`,
    `rgba(58,175,169,${alpha * 0.8})`,
    `rgba(255,255,255,${alpha * 0.85})`,
  ];
  return {
    id: Math.random().toString(36).slice(2),
    x,
    y,
    radius,
    speed,
    drift,
    alpha,
    border,
    color: colors[colorIdx],
  };
}

export default function Bubbles() {
  const [bubbles, setBubbles] = useState([]);
  const frameRef = useRef();
  const sizeRef = useRef({ w: 0, h: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      sizeRef.current = { w: width, h: height };
      setBubbles(
        Array.from({ length: bubbleCount }, () => createBubble(width, height))
      );
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function animate() {
      setBubbles((prev) =>
        prev.map((b) => {
          const x = b.x + b.drift;
          const y = b.y - b.speed;
          const { w, h } = sizeRef.current;
          if (y + b.radius < 0 || x < -b.radius || x > w + b.radius) {
            return createBubble(w, h);
          }
          return { ...b, x, y };
        })
      );
      frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div ref={containerRef} className={styles.bubbleArea}>
      {bubbles.map((b) => (
        <div
          key={b.id}
          className={styles.bubble}
          style={{
            left: b.x - b.radius,
            top: b.y - b.radius,
            width: b.radius * 2,
            height: b.radius * 2,
            "--bubble-opacity": b.alpha,
            "--bubble-border": `${b.border}px solid rgba(255,255,255,0.8)`,
            "--bubble-background": `radial-gradient(circle at 35% 35%, #fff9 30%, ${b.color} 60%, #fff1 100%)`,
          }}
        />
      ))}
    </div>
  );
}
