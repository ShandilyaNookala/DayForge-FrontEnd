import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";

import { baseUrl, currentDate } from "../../utils/config";
import { displayTimeTaken, sendAPI } from "../../utils/helpers";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/global-components/Header/Header";
import Spinner from "../../components/global-components/Spinner/Spinner";

import styles from "./StudentTasks.module.css";
import { useAuth } from "../../contexts/AuthContext";
import NotAuthorized from "../../components/global-components/NotAuthorized/NotAuthorized";

export default function StudentTasks() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [data, setData] = useState([]);
  const [tasksToMarkObsolete, setTasksToMarkObsolete] = useState([]);
  const [markedObsolete, setMarkedObsolete] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const personName = user.userName;

  const columns = useMemo(function () {
    return [
      { field: "number", headerName: "No." },
      { field: "taskName", headerName: "Task Name", flex: 1 },
      {
        field: "formattedWork",
        headerName: "Works",
        flex: 1,
      },
      {
        field: "timeTaken",
        headerName: "Time Taken",
        flex: 1,
        valueFormatter: displayTimeTaken,
      },
      { field: "formattedResult", headerName: "Results", flex: 1 },
      { field: "formattedGrade", headerName: "Grades", flex: 1 },
    ];
  }, []);

  useEffect(
    function () {
      async function fetchData() {
        setIsLoading(true);
        const data = (
          await sendAPI("GET", `${baseUrl}/records/get-student-tasks`)
        ).data;

        setData(data);
        setIsLoading(false);
      }
      fetchData();
    },
    [markedObsolete]
  );

  if (user.isAdmin) return <NotAuthorized />;

  async function handleObsolete() {
    setIsLoading(true);
    await sendAPI("POST", `${baseUrl}/records/mark-obsolete`, {
      tasksToMarkObsolete,
    });
    setMarkedObsolete((markedObsolete) => !markedObsolete);
  }

  function handleClickOnRow(e) {
    const taskId = data[e.row.number - 1].id;
    navigate(`/course/${taskId}`);
  }

  function handleSelectionChanged(newSelectionModel) {
    setTasksToMarkObsolete(newSelectionModel);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>Welcome {personName}!</Header>

          <Container className="dataGrid">
            <Box className={styles.todoHeader}>
              Organizing '{currentDate.split("-")[1]}/
              {currentDate.split("-")[2]}/{currentDate.split("-")[0]}' with{" "}
              {personName}
            </Box>
            <DataGrid
              rows={data}
              columns={columns}
              checkboxSelection
              isRowSelectable={(params) => params.row.checkable}
              onRowSelectionModelChange={handleSelectionChanged}
              onRowClick={handleClickOnRow}
            />
            {Boolean(tasksToMarkObsolete.length) && (
              <Button className={styles.markObsolete} onClick={handleObsolete}>
                Mark Obsolete
              </Button>
            )}
          </Container>
        </>
      )}
    </>
  );
}
