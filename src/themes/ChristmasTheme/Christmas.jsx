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
        <Box
          component="svg"
          className={styles.santaScene}
          viewBox="0 0 420 190"
          role="presentation"
        >
          <g className={styles.reindeer}>
            <path d="M305 89c18-19 46-13 52 7 5 17-5 34-24 38-21 4-42-13-40-31 1-6 5-11 12-14Z" fill="#9a542f" />
            <ellipse cx="365" cy="91" rx="28" ry="22" fill="#a96137" />
            <ellipse cx="391" cy="90" rx="12" ry="10" fill="#40271d" />
            <circle cx="374" cy="83" r="5" fill="#fff" />
            <circle cx="376" cy="83" r="2.5" fill="#171a1c" />
            <path d="M352 69c-2-18-11-27-25-31m27 28c10-16 20-23 34-24M326 38l-8-11m12 14 2-15m56 16 8-11m-12 13-1-15" fill="none" stroke="#6b3e29" strokeWidth="7" strokeLinecap="round" />
            <path d="M319 124l-18 37m40-31 18 33m-59-2-13 2m72 0 14-2" fill="none" stroke="#6b3e29" strokeWidth="8" strokeLinecap="round" />
            <path d="M287 98c-32 8-49 20-67 31" fill="none" stroke="#e2b464" strokeWidth="3" />
          </g>
          <g className={styles.santaFigure}>
            <path d="M28 142h218l-18 32H54c-17 0-26-12-26-32Z" fill="#a94a24" />
            <path d="M35 146h201M55 164h155" fill="none" stroke="#e8a35b" strokeWidth="5" strokeLinecap="round" />
            <path d="M48 173c13 15 32 14 48 1m76 0c13 15 31 14 45 0" fill="none" stroke="#d5ad61" strokeWidth="6" strokeLinecap="round" />
            <path d="M39 68c5-22 27-39 56-39 31 0 53 17 57 42l9 73H31Z" fill="#d3ae55" />
            <path d="M39 72h112v69H36Z" fill="#ad552a" stroke="#e1954f" strokeWidth="5" />
            <path d="M50 85h88v42H50Z" fill="#bb6233" stroke="#df8d49" strokeWidth="4" />
            <ellipse cx="205" cy="93" rx="37" ry="43" fill="#d72d30" />
            <circle cx="202" cy="58" r="27" fill="#f5c88f" />
            <path d="M172 55c4 31 17 48 35 48 20 0 31-18 29-47-8 9-17 13-31 13-13 0-23-5-33-14Z" fill="#fffaf1" />
            <circle cx="193" cy="58" r="3" fill="#253133" />
            <circle cx="211" cy="58" r="3" fill="#253133" />
            <path d="M195 74c7 5 14 5 20-1" fill="none" stroke="#a84a34" strokeWidth="3" strokeLinecap="round" />
            <path d="M175 43c8-27 38-35 56-12l-3 12Z" fill="#d72d30" />
            <path d="M174 43h57" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
            <circle cx="231" cy="28" r="9" fill="#fff" />
            <path d="M225 91c19 2 28-3 40-17" fill="none" stroke="#d72d30" strokeWidth="15" strokeLinecap="round" />
            <circle cx="267" cy="71" r="8" fill="#fffaf1" />
            <path d="M264 67l2-13m1 13 10-9m-10 10 13 1" fill="none" stroke="#f5c88f" strokeWidth="4" strokeLinecap="round" />
            <path d="M181 129h48" stroke="#222" strokeWidth="9" strokeLinecap="round" />
            <rect x="199" y="122" width="13" height="14" rx="2" fill="#ffd353" />
          </g>
        </Box>
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
  );
}
