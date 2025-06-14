import { Box, Chip, Typography } from "@mui/material";
import styles from "./TaskAssignedToRule.module.css";

function TaskAssignedToRule({ task }) {
  return (
    <Box className={styles.task}>
      <Typography variant="h6" className={styles.taskName}>
        {task.taskName}
      </Typography>
      <Chip label={task.student.userName} className={styles.assignedTo} />
    </Box>
  );
}

export default TaskAssignedToRule;
