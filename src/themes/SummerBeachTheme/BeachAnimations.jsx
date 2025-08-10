import React from "react";
import "./colors.css";
import styles from "./BeachAnimations.module.css";
import Box from "@mui/material/Box";

const BeachAnimations = () => (
  <Box className={styles.beachRoot}>
    {/* Sun */}
    <Box className={styles.sunContainer}>
      <Box className={styles.rayBox}>
        {[...Array(12)].map((_, i) => (
          <Box
            key={i}
            className={styles.ray + " " + styles[`ray${i + 1}`]}
          ></Box>
        ))}
      </Box>
      <Box className={styles.sun}></Box>
    </Box>
    {/* Seagulls */}
    <Box className={styles.birds}>
      {[...Array(3)].map((_, i) => (
        <Box key={i} className={styles.gull + " " + styles[`g${i + 1}`]}></Box>
      ))}
    </Box>
    <Box className={styles.birds}>
      {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((n) => (
        <Box
          key={n}
          className={
            styles.gull +
            " " +
            styles[`g${n}`] +
            ([6, 9, 12].includes(n) ? " " + styles.rev : "")
          }
        ></Box>
      ))}
    </Box>
    {/* Sky */}
    <Box className={styles.sky}></Box>
    {/* Clouds */}
    {[1, 2, 3].map((n) => (
      <Box key={n} className={styles.cloud + " " + styles[`c${n}`]}>
        <Box className={styles.puff + " " + styles.p1}></Box>
        <Box className={styles.puff + " " + styles.p2}></Box>
        <Box className={styles.puff + " " + styles.p3}></Box>
        <Box className={styles.puff + " " + styles.p4}></Box>
      </Box>
    ))}
    {/* Sand, Wet Sand, Sea, Seafoam, Sand Front */}
    <Box className={styles.sand}></Box>
    <Box className={styles.wetSand}></Box>
    <Box className={styles.sea}>
      <Box className={styles.seafoam}></Box>
    </Box>
    <Box className={styles.sandFront}></Box>
  </Box>
);

export default BeachAnimations;
