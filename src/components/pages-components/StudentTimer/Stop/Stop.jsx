import { Button, TableCell, TableRow } from "@mui/material";
import StopIcon from "@mui/icons-material/Stop";
import styles from "./Stop.module.css";

function Stop({ hasStarted, onStopTime }) {
  return (
    <TableRow>
      <TableCell className={styles.labelCell}>End Timer</TableCell>
      <TableCell className={styles.controlCell}>
        <Button disabled={!hasStarted} onClick={onStopTime}>
          <StopIcon className={styles.icon} />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Stop;
