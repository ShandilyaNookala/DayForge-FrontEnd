import { createContext, useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/config";
import { sendAPI } from "../utils/helpers";

const PositionsContext = createContext();

function PositionsProvider({ children }) {
  const [changedTask, setChangedTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(function () {
    async function getData() {
      setIsLoading(true);
      const data = await sendAPI("GET", `${baseUrl}/positions`);
      setData(data?.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  function handleStartAdding(studentId) {
    setChangedTask({ type: "Add", studentId });
  }

  function handleStartEditing(taskId) {
    setChangedTask({ type: "Edit", taskId });
  }

  async function handleAddOrEditTask(taskName) {
    if (!taskName) return;
    let positionsData;

    if (changedTask.type === "Add") {
      positionsData = await sendAPI("POST", `${baseUrl}/records`, {
        taskName,
        studentId: changedTask.studentId,
      });
    } else {
      positionsData = await sendAPI(
        "PATCH",
        `${baseUrl}/records/update-task-name/${changedTask.taskId}`,
        {
          taskName,
        },
      );
    }

    setData(positionsData?.data);
    setChangedTask(null);
  }

  async function handleChangePosition(studentId) {
    const tasksForStudent = data.find(
      (student) => student.studentId === studentId,
    );
    await sendAPI("PATCH", `${baseUrl}/positions`, tasksForStudent);
  }

  function sortTasks(studentId, positionName, newTasks) {
    setData((data) =>
      data.map((student) =>
        student.studentId === studentId
          ? {
              ...student,
              positions: student.positions.map((position) =>
                position.position === positionName
                  ? { ...position, tasks: newTasks }
                  : position,
              ),
            }
          : student,
      ),
    );
  }

  return (
    <PositionsContext.Provider
      value={{
        changedTask,
        data,
        isLoading,
        handleStartAdding,
        handleStartEditing,
        handleAddOrEditTask,
        handleChangePosition,
        sortTasks,
      }}
    >
      {children}
    </PositionsContext.Provider>
  );
}

function usePositions() {
  const context = useContext(PositionsContext);
  if (!context) {
    throw new Error("usePositions must be used within a PositionsProvider");
  }
  return context;
}

export { PositionsProvider, usePositions };
