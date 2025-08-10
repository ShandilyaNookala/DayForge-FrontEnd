import { Box } from "@mui/material";
import { starsCount } from "./itemsCount";
import styles from "./Stars.module.css";

export default function Stars() {
  const stars = Array.from({ length: starsCount }, (_, i) => ({
    size: Math.random() * 5 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    i,
    color: i % 2 === 0 ? "#f4fcb3" : "#5a8c58",
    animationDelay: i % 2 === 0 ? `-${2.5}s` : `-${3}s`,
  }));

  return (
    <Box className={styles.stars}>
      {stars.map((star) => (
        <Box
          key={star.i}
          className={styles.star}
          sx={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.left}%`,
            top: `${star.top}%`,
            backgroundColor: star.color,
            animationDelay: star.animationDelay,
            borderRadius: "50%",
            position: "absolute",
          }}
        />
      ))}
    </Box>
  );
}
