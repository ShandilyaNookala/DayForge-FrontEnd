import { Box, Button, TableCell, TableRow } from "@mui/material";

function StartButton({ hasStarted, onClickPlayPauseButton }) {
  return (
    <TableRow>
      <TableCell>Start/Pause/Resume Timer</TableCell>
      <TableCell>
        {!hasStarted && (
          <Button onClick={onClickPlayPauseButton}>
            <Box component="img" src="/play-icon.png" alt="play" />
          </Button>
        )}
        {hasStarted && (
          <Button onClick={onClickPlayPauseButton}>
            <Box component="img" src="/pause-icon.png" alt="pause" />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default StartButton;
