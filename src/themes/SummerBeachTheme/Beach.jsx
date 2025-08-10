import { useMemo } from "react";
import "./colors.css";
import styles from "./Beach.module.css";
import Box from "@mui/material/Box";
import { rayCount, gullCount, cloudCount } from "./itemsCount";

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

const Beach = () => {
  const rays = useMemo(
    () =>
      Array.from({ length: rayCount }, (_, i) => ({
        angle: (360 / rayCount) * i,
      })),
    []
  );

  const clouds = useMemo(
    () =>
      Array.from({ length: cloudCount }, () => ({
        top: `${rand(6, 22)}%`,
        sx: rand(0.8, 1.2),
        dur: `${randInt(80, 115)}s`,
        delay: `-${randInt(5, 60)}s`,
        puffs: [
          { w: 52, h: 52, top: 10, left: 20 },
          { w: 72, h: 72, top: 0, left: 56 },
          { w: 46, h: 46, top: 18, left: 112 },
          { w: 38, h: 38, top: 30, left: 74 },
        ],
      })),
    []
  );

  const birds = useMemo(
    () =>
      Array.from({ length: gullCount }, (_, i) => ({
        n: i + 1,
        top: `${rand(2, 18)}vh`,
        sx: rand(0.7, 1.2),
        dur: `${randInt(68, 120)}s`,
        delay: `-${randInt(8, 108)}s`,
      })),
    []
  );

  return (
    <Box className={styles.beachRoot}>
      <Box className={styles.sunContainer}>
        <Box className={styles.rayBox}>
          {rays.map((r, i) => (
            <Box
              key={i}
              className={styles.ray}
              style={{ "--angle": `${r.angle}deg` }}
            ></Box>
          ))}
        </Box>
        <Box className={styles.sun}></Box>
      </Box>

      <Box className={styles.birds}>
        {birds.map((b) => (
          <Box
            key={b.n}
            className={styles.gull}
            style={{
              top: b.top,
              animationDelay: b.delay,
            }}
          ></Box>
        ))}
      </Box>

      <Box className={styles.sky}></Box>

      {clouds.map((c, ci) => (
        <Box
          key={ci}
          className={styles.cloud}
          style={{
            top: c.top,
            animationDelay: c.delay,
          }}
        >
          {c.puffs.map((p, pi) => (
            <Box
              key={pi}
              className={styles.puff}
              style={{ width: p.w, height: p.h, top: p.top, left: p.left }}
            ></Box>
          ))}
        </Box>
      ))}

      <Box className={styles.sand}></Box>
      <Box className={styles.wetSand}></Box>
      <Box className={styles.sea}>
        <Box className={styles.seafoam}></Box>
      </Box>
      <Box className={styles.sandFront}></Box>
    </Box>
  );
};

export default Beach;
