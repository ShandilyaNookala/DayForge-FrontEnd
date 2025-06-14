import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { usePositions } from "../../../../contexts/PositionsContext";
import { useState } from "react";

function ChangedTask({ defaultValue = "" }) {
  const [inputTaskContent, setInputTaskContent] = useState(defaultValue);

  const { changedTask, handleAddOrEditTask } = usePositions();
  return (
    <TableRow>
      <TableCell className="table-cell">{changedTask?.type}</TableCell>
      <TableCell className="table-cell" colSpan={2}>
        <TextField
          className="default-text-field"
          autoFocus
          value={inputTaskContent}
          onChange={(e) => setInputTaskContent(e.target.value)}
        />
      </TableCell>
      <TableCell className="table-cell">
        <Button onClick={() => handleAddOrEditTask(inputTaskContent)}>
          Save
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ChangedTask;
