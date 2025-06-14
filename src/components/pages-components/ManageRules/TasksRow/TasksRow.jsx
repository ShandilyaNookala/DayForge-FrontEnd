import { Autocomplete, Box, Button, TextField } from "@mui/material";
import TaskAssignedToRule from "../TaskAssignedToRule/TaskAssignedToRule";
import styles from "./TasksRow.module.css";
import { useState } from "react";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";

function TasksRow({
  tasksValue,
  setData,
  ruleId,
  tasksWithNoRule,
  ruleWithTasksDropdown,
  setRuleWithTasksDropdown,
}) {
  const [value, setValue] = useState([]);

  async function handleSaveTasks() {
    const taskIds = value.map((task) => task.id);
    const data = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-manage-rules`,
      {
        taskIds,
        ruleId,
      }
    );
    setData(data.data);
    setRuleWithTasksDropdown(null);
  }

  function handleStopPropagation(e) {
    if (
      e.key === " " ||
      e.key === "ArrowDown" ||
      e.key === "ArrowUp" ||
      e.key === "Enter"
    ) {
      e.stopPropagation();
    }
  }

  function handleSetRuleWithTaskDropdown(ruleId) {
    setRuleWithTasksDropdown(ruleId);
  }

  return (
    <Box className={styles.tasks}>
      <Box className={styles.tasksGroup}>
        {tasksValue.map((task) => (
          <TaskAssignedToRule key={task._id} task={task} />
        ))}
      </Box>
      {ruleWithTasksDropdown === ruleId ? (
        <Autocomplete
          multiple
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          className={`default-text-field ${styles.taskAutocomplete}`}
          options={tasksWithNoRule || []}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tasks"
              onKeyDown={handleStopPropagation}
            />
          )}
        />
      ) : null}
      {ruleWithTasksDropdown !== ruleId ? (
        <Button
          className={styles.addTaskButton}
          onClick={() => handleSetRuleWithTaskDropdown(ruleId)}
        >
          Add Task
        </Button>
      ) : (
        <Button className={styles.addTaskButton} onClick={handleSaveTasks}>
          Save
        </Button>
      )}
    </Box>
  );
}

export default TasksRow;
