import EditIcon from "@mui/icons-material/Edit";
import { Button, TableCell, TableRow } from "@mui/material";
import { Link } from "react-router";
import { usePositions } from "../../../../contexts/PositionsContext";

export default function Task({ task, index }) {
  const { handleStartEditing } = usePositions();
  if (!task) return null;
  return (
    <TableRow>
      <TableCell className="table-cell">{index + 1}</TableCell>
      <TableCell className="table-cell">
        <Link className="btn" to={`/course/${task?._id}`}>
          {task.taskName}
        </Link>
      </TableCell>
      <TableCell className="table-cell">
        <Button onClick={() => handleStartEditing(task._id)}>
          <EditIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
