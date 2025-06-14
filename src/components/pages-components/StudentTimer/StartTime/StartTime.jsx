import { TableCell, TableRow } from "@mui/material";

function StartTime({ startTime }) {
  return (
    <TableRow>
      <TableCell>Start Time</TableCell>
      <TableCell>
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
