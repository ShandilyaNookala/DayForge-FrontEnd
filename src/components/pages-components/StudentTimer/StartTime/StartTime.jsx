import { TableCell, TableRow } from "@mui/material";
import styles from "./StartTime.module.css";

function StartTime({ startTime }) {
  return (
    <TableRow>
      <TableCell className={styles.labelCell}>Start Time</TableCell>
      <TableCell className={styles.controlCell}>
        {startTime
          ? startTime?.getHours() % 12 === 0
            ? 12
            : startTime?.getHours() % 12
          : ""}
        {startTime && ":"}
        {startTime && startTime?.getMinutes().toString().padStart(2, "0")}{" "}
        {startTime && (startTime?.getHours() >= 12 ? "PM" : "AM")}
      </TableCell>
    </TableRow>
  );
}

export default StartTime;
