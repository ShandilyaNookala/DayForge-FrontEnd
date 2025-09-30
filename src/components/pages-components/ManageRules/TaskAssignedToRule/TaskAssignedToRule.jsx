import { Chip, Typography } from "@mui/material";
import styles from "./TaskAssignedToRule.module.css";
import { Link } from "react-router";

function TaskAssignedToRule({ task }) {
  return (
    <Link to={`/course/${task._id}`} className={`${styles.task} btn`}>
      <Typography variant="h6" className={styles.taskName}>
        {task.taskName}
      </Typography>
      <Chip label={task.student.userName} className={styles.assignedTo} />
    </Link>
  );
}

export default TaskAssignedToRule;
