import styles from "./HalloweenReboot.module.css";

const embers = Array.from({ length: 90 }, (_, i) => {
  const duration = 10 + ((i * 7) % 13);
  return {
    left: `${(i * 37 + 7) % 100}%`,
    animationDelay: `${-duration * (((i * 43) % 100) / 100)}s`,
    animationDuration: `${duration}s`,
    "--spark-size": `${2 + (i % 4)}px`,
    "--spark-height": `${i % 9 === 0 ? 10 : 2 + (i % 4)}px`,
    "--spark-color":
      i % 5 === 0 ? "#c69aef" : i % 3 === 0 ? "#ffd080" : "#fea23e",
    "--spark-drift": `${((i * 29) % 180) - 90}px`,
    "--spark-sway": `${((i * 17) % 60) - 30}px`,
  };
});

export default function HalloweenReboot() {
  return (
    <div className={styles.scene} aria-hidden="true">
      <div className={styles.artwork} />
      <div className={styles.vignette} />
      <div className={styles.mist} />
      {embers.map((style, i) => (
        <span key={i} className={styles.ember} style={style} />
      ))}
    </div>
  );
}
