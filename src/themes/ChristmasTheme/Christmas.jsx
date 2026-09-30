import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import styles from "./Christmas.module.css";
import { bokehCount, lightsCount, snowflakesCount } from "./itemsCount";

const lightColors = ["#ffd353", "#e7354f", "#70e878", "#70bafa"];

const createRandom = () => {
  let seed = 93721;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
};

export default function Christmas() {
  const decorations = useMemo(() => {
    const random = createRandom();
    const snowflakes = Array.from({ length: snowflakesCount }, (_, index) => ({
      id: `snowflake-${index}`,
      left: random() * 100,
      size: 0.6 + random() * 1.15,
      opacity: 0.25 + random() * 0.55,
      duration: 9 + random() * 12,
      delay: -(random() * 20),
      drift: (random() - 0.5) * 12,
    }));
    const bokeh = Array.from({ length: bokehCount }, (_, index) => ({
      id: `bokeh-${index}`,
      left: random() * 100,
      top: random() * 100,
      size: 2 + random() * 4,
      color: lightColors[index % lightColors.length],
      delay: -(random() * 8),
    }));

    return { snowflakes, bokeh };
  }, []);

  return (
    <Box className={styles.christmasContainer} aria-hidden="true">
      <Box component="ul" className={styles.lightrope}>
        {Array.from({ length: lightsCount }, (_, index) => (
          <Box
            component="li"
            key={`christmas-light-${index}`}
            className={styles.bulb}
            sx={{
              backgroundColor: lightColors[index % lightColors.length],
              color: lightColors[index % lightColors.length],
              animationDelay: `${(index % 5) * -0.35}s`,
            }}
          />
        ))}
      </Box>

      <Box className={styles.bokeh}>
        {decorations.bokeh.map((light) => (
          <Box
            key={light.id}
            className={styles.glow}
            sx={{
              left: `${light.left}%`,
              top: `${light.top}%`,
              width: `${light.size}rem`,
              height: `${light.size}rem`,
              backgroundColor: light.color,
              color: light.color,
              animationDelay: `${light.delay}s`,
            }}
          />
        ))}
      </Box>

      <Box className={styles.snow}>
        {decorations.snowflakes.map((flake) => (
          <AcUnitIcon
            key={flake.id}
            className={styles.snowflake}
            sx={{
              left: `${flake.left}%`,
              fontSize: `${flake.size}rem`,
              opacity: flake.opacity,
              animationDuration: `${flake.duration}s`,
              animationDelay: `${flake.delay}s`,
              marginLeft: `${flake.drift}vw`,
            }}
          />
        ))}
      </Box>

      <Box className={styles.sleigh}>
        <Typography component="span" className={styles.santa}>
          🎅
        </Typography>
        <Typography component="span" className={styles.sleighBody}>
          🛷
        </Typography>
      </Box>

      <Box className={styles.tree}>
        <StarRoundedIcon className={styles.treeStar} />
        <Box className={styles.treeTop} />
        <Box className={styles.treeMiddle} />
        <Box className={styles.treeBottom} />
        <Box className={styles.trunk} />
        <Box className={styles.ornamentOne} />
        <Box className={styles.ornamentTwo} />
        <Box className={styles.ornamentThree} />
      </Box>

      <Box className={styles.snowbank} />
    </Box>
  );
}
