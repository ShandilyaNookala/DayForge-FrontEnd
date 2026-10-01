import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
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
    <>
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

        <Box className={styles.treeArt}>
          <Box
            component="svg"
            className={styles.treeDrawing}
            viewBox="0 0 300 350"
            role="presentation"
          >
            <path
              className={styles.treeLine}
              d="M18 318C34 300 75 309 98 314M121 320c-17 0-25-4-25-16 0-11 14-18 22-25 15-13 12-24-8-31-24-9-48-16-45-30 2-11 23-18 39-26 22-11 23-24 2-35-17-9-37-16-34-28 2-10 18-17 30-28 23-20 42-60 55-89 5-11 11-11 17 0 18 37 35 68 62 89 13 10 28 17 30 27 3 13-17 20-34 29-21 11-20 24 2 35 17 8 37 15 40 26 3 14-21 21-45 30-20 7-23 18-8 31 8 7 22 14 22 25 0 12-9 16-25 16"
            />
          </Box>
          <Typography component="span" className={styles.snowman}>
            ⛄
          </Typography>
          <Typography component="span" className={styles.christmasGreeting}>
            Merry Christmas
          </Typography>
        </Box>

        <Box className={styles.snowbank} />
      </Box>

      <Box className={styles.santaOverlay} aria-hidden="true">
        <Box
          component="img"
          className={styles.santaScene}
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/191814/santas.gif"
          alt=""
          role="presentation"
        />
      </Box>
    </>
  );
}
