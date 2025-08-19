import { Button, TableCell, TableRow } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import styles from "./StartButton.module.css";

function StartButton({ hasStarted, onClickPlayPauseButton }) {
  return (
    <TableRow>
      <TableCell>Start/Pause/Resume Timer</TableCell>
      <TableCell>
        {!hasStarted && (
          <Button onClick={onClickPlayPauseButton}>
            <PlayArrowIcon className={styles.icon} />
          </Button>
        )}
        {hasStarted && (
          <Button onClick={onClickPlayPauseButton}>
            <PauseIcon className={styles.icon} />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default StartButton;
