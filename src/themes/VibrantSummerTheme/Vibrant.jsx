import { useMemo } from "react";
import "./colors.css";
import styles from "./Vibrant.module.css";
import Box from "@mui/material/Box";
import { sliceCount } from "./itemsCount";

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max + 1));

const Vibrant = () => {
  const slices = useMemo(() => {
    const hueClasses = ["orange", "lemon", "lime"];
    return Array.from({ length: sliceCount }, () => ({
      x: `${randInt(8, 82)}vw`,
      d: `${randInt(26, 30)}s`,
      size: `${randInt(66, 92)}px`,
      rot: `${randInt(-10, 14)}deg`,
      delay: `-${randInt(1, 13)}s`,
      hueClass: hueClasses[randInt(0, hueClasses.length - 1)],
    }));
  }, []);

  return (
    <>
      <Box className={styles.backgroundRoot} />
      <Box className={styles.overlayRoot}>
        <Box className={styles.sun} aria-hidden="true" />
        <Box className={styles.citrus} aria-hidden="true">
          {slices.map((s, i) => (
            <Box
              key={i}
              className={styles.slice + " " + styles[s.hueClass]}
              style={{
                "--x": s.x,
                "--d": s.d,
                "--size": s.size,
                "--rot": s.rot,
                animationDelay: s.delay,
              }}
              aria-hidden="true"
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Vibrant;
