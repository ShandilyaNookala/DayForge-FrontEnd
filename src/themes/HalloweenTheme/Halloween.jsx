import { Box } from "@mui/material";
import { pumpkinsCount, ghostsCount, starsCount } from "./itemsCount";
import styles from "./Halloween.module.css";
import MoonIcon from "./svgs/MoonIcon";
import BatIcon from "./svgs/BatIcon";
import PumpkinIcon from "./svgs/PumpkinIcon";
import GhostIcon from "./svgs/GhostIcon";
import CauldronIcon from "./svgs/CauldronIcon";

export default function Halloween() {
  const stars = Array.from({ length: starsCount }, (_, i) => ({
    size: Math.random() * 0.25 + 0.125,
    left: Math.random() * 100,
    top: Math.random() * 100,
    i,
    color: i % 2 === 0 ? "#e9e7ff" : "#c9c4ff",
    animationDelay: i % 2 === 0 ? `-${2.5}s` : `-${3}s`,
  }));

  const pumpkins = Array.from({ length: pumpkinsCount }, (_, i) => ({
    left: Math.random() * 90 + 5,
    top: Math.random() * 85 + 5,
    i,
    animationDelay: `${i * 0.5}s`,
  }));

  const ghosts = Array.from({ length: ghostsCount }, (_, i) => ({
    top: Math.random() * 90 + 2,
    i,
    animationDelay: `-${i * 6}s`,
  }));

  return (
    <Box className={styles.halloweenContainer}>
      <Box className={styles.stars}>
        {stars.map((star) => (
          <Box
            key={star.i}
            className={styles.star}
            sx={{
              width: `${star.size}rem`,
              height: `${star.size}rem`,
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: star.color,
              animationDelay: star.animationDelay,
            }}
          />
        ))}
      </Box>

      <MoonIcon className={styles.moon} />
      <BatIcon className={styles.moonBat} />

      <Box className={styles.pumpkins}>
        {pumpkins.map((pumpkin) => (
          <Box
            key={pumpkin.i}
            className={styles.pumpkin}
            sx={{
              left: `${pumpkin.left}%`,
              top: `${pumpkin.top}%`,
              animationDelay: pumpkin.animationDelay,
            }}
          >
            <PumpkinIcon />
          </Box>
        ))}
      </Box>

      <Box className={styles.ghostsLayer}>
        {ghosts.map((ghost) => (
          <Box
            key={ghost.i}
            className={styles.ghost}
            sx={{
              top: `${ghost.top}vh`,
              animationDelay: ghost.animationDelay,
            }}
          >
            <Box className={styles.ghostBody}>
              <GhostIcon />
            </Box>
          </Box>
        ))}
      </Box>

      <Box className={styles.cauldron}>
        <CauldronIcon />
      </Box>
    </Box>
  );
}
