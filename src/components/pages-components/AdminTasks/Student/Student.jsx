import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import styles from "./Student.module.css";
import TasksList from "../TasksList/TasksList";
import { usePositions } from "../../../../contexts/PositionsContext";

export default function Student({ student }) {
  const [isShowing, setIsShowing] = useState(false);
  const [dragging, setDragging] = useState(null);

  const { handleStartAdding, handleChangePosition } = usePositions();

  function handleToggleShowing() {
    setIsShowing((isShowing) => !isShowing);
  }

  function handleShowAddTask() {
    setIsShowing(true);
    handleStartAdding(student.studentId);
  }

  useEffect(
    function () {
      if (dragging === false) handleChangePosition(student.studentId);
    },
    [dragging, student.studentId, handleChangePosition],
  );

  return (
    <Box>
      <Box className={styles.personRow}>
        <Button onClick={handleToggleShowing}>{isShowing ? "-" : "+"}</Button>
        <Box className={styles.name}>{student.studentName}</Box>
        <Button onClick={handleShowAddTask}>
          Add new task for {student.studentName}
        </Button>
      </Box>
      {isShowing && (
        <Box className={styles.tasks}>
          {student.positions.map((position) => (
            <TasksList
              position={position}
              setDragging={setDragging}
              studentId={student.studentId}
              key={position.position}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
