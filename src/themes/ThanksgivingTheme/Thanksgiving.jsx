import { useMemo } from "react";
import { Box } from "@mui/material";
import { leavesCount } from "./itemsCount";
import styles from "./Thanksgiving.module.css";
import TurkeyIcon from "./svgs/TurkeyIcon";

const leafVariants = [
  {
    background:
      "radial-gradient(ellipse at center, #e17223 75%, #db8507 95%, transparent 100%)",
    tilt: 18,
    twist: 0,
    scale: 1,
  },
  {
    background: "radial-gradient(ellipse at center, #db8507 80%, #ffd95a 100%)",
    tilt: -12,
    twist: 0,
    scale: 1.25,
  },
  {
    background: "radial-gradient(ellipse at center, #ffd95a 86%, #e17223 100%)",
    tilt: 12,
    twist: 26,
    scale: 1.1,
  },
];

export default function Thanksgiving() {
  const leaves = useMemo(
    () =>
      Array.from({ length: leavesCount }, (_, index) => {
        const variant = leafVariants[index % leafVariants.length];
        const size = 1.1 + Math.random() * 1.3;
        return {
          id: `thanksgiving-leaf-${index}`,
          left: Math.random() * 100,
          delay: Math.random() * 7,
          duration: 9 + Math.random() * 6,
          opacity: 0.65 + Math.random() * 0.25,
          drift: Math.random().toFixed(2),
          variant,
          size,
          scale: variant.scale + Math.random() * 0.15,
          tiltOffset: variant.tilt + (Math.random() - 0.5) * 10,
          twist: variant.twist,
        };
      }),
    []
  );

  const turkeyLeftClassName = [
    styles.turkey,
    styles.turkeyLeft,
    styles["turkey-left"],
  ]
    .filter(Boolean)
    .join(" ");

  const turkeyRightClassName = [
    styles.turkey,
    styles.turkeyRight,
    styles["turkey-right"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Box className={styles.thanksgivingContainer} aria-hidden="true">
      <Box className={styles.leaves}>
        {leaves.map((leaf) => (
          <Box
            key={leaf.id}
            className={styles.leaf}
            style={{
              "--leaf-left": `${leaf.left}vw`,
              "--leaf-delay": `${leaf.delay}s`,
              "--leaf-duration": `${leaf.duration}s`,
              "--leaf-size": `${leaf.size}rem`,
              "--leaf-opacity": `${leaf.opacity}`,
              "--leaf-background": leaf.variant.background,
              "--leaf-scale": `${leaf.scale}`,
              "--leaf-tilt": `${leaf.tiltOffset}deg`,
              "--leaf-twist": `${leaf.twist}deg`,
              "--leaf-drift": `${leaf.drift}`,
            }}
          />
        ))}
      </Box>

      <TurkeyIcon className={turkeyLeftClassName} />
      <TurkeyIcon className={turkeyRightClassName} />
    </Box>
  );
}
