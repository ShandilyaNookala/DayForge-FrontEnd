import { Box, Button, TableCell, TableRow } from "@mui/material";

function Stop({ hasStarted, onStopTime }) {
  return (
    <TableRow>
      <TableCell>End Timer</TableCell>
      <TableCell>
        <Button disabled={!hasStarted} onClick={onStopTime}>
          <Box component="img" src="/stop-icon.png" alt="stop" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default Stop;
