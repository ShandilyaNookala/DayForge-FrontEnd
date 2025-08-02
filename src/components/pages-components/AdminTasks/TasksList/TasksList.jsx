import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Task from "../Task/Task";
import styles from "./TasksList.module.css";
import { usePositions } from "../../../../contexts/PositionsContext";
import ChangedTask from "../ChangedTask/ChangedTask";
import { ReactSortable } from "react-sortablejs";

export default function TasksList({ position, studentId, setDragging }) {
  const { changedTask, sortTasks } = usePositions();
  const result = position.position.replace(/([A-Z])/g, " $1");
  const positionFormatted = result.charAt(0).toUpperCase() + result.slice(1);

  return (
    <Box className={styles.listsContainer}>
      <Box className={styles.positionName}>{positionFormatted}</Box>
      <Table className={styles.lists}>
        <TableHead>
          <TableRow>
            <TableCell className="table-cell">No.</TableCell>
            <TableCell className="table-cell">Task</TableCell>
            <TableCell className="table-cell">Edit</TableCell>
          </TableRow>
        </TableHead>
        <ReactSortable
          tag="tbody"
          animation={50}
          onStart={() => setDragging(true)}
          onEnd={() => setDragging(false)}
          group={`student-group-${studentId}`}
          list={position.tasks}
          setList={(list) => sortTasks(studentId, position.position, list)}
        >
          {position.tasks.map((task, i) =>
            task._id === changedTask?.taskId ? (
              <ChangedTask key={task._id} defaultValue={task.taskName} />
            ) : (
              <Task key={task._id} index={i} task={task} />
            ),
          )}
        </ReactSortable>
        {position.position === "currentTasks" &&
          changedTask?.type === "Add" &&
          studentId === changedTask?.studentId && (
            <TableBody>
              <ChangedTask />
            </TableBody>
          )}
      </Table>
    </Box>
  );
}
