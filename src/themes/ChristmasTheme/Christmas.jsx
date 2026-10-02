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
              className={styles.treeStar}
              d="m150 18 8.5 17.2 19 2.8-13.8 13.4 3.3 18.9-17-8.9-17 8.9 3.3-18.9L122.5 38l19-2.8Z"
            />
            <path
              className={styles.treeLine}
              d="M150 78C135 103 126 128 106 151 95 164 83 172 70 178c-8 4-8 9 1 12l30 10c9 3 10 8 2 14-13 10-36 18-50 29-9 7-8 13 2 17l36 13c10 4 11 10 2 16-12 8-25 15-34 24m182 0c-9-9-22-16-34-24-9-6-8-12 2-16l36-13c10-4 11-10 2-17-14-11-37-19-50-29-8-6-7-11 2-14l30-10c9-3 9-8 1-12-13-6-25-14-36-27-20-23-29-48-44-73"
            />
            <path
              className={styles.treeBase}
              d="M58 317c31-12 62-9 91-2 29 8 58 14 93 2M136 322c0 17 28 17 28 0"
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

      <Box component="ul" className={styles.lightrope} aria-hidden="true">
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
