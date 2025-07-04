import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { baseUrl } from "../../utils/config.js";
import { displayTimeTaken, sendAPI } from "../../utils/helpers.js";

import ChangedRecord from "../../components/pages-components/Course/ChangedRecord/ChangedRecord.jsx";
import Footer from "../../components/global-components/Footer/Footer.jsx";
import Header from "../../components/global-components/Header/Header.jsx";
import { Box, Button, Container, Dialog, Slide } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import Spinner from "../../components/global-components/Spinner/Spinner.jsx";

import { Link, Outlet, useNavigate, useParams } from "react-router";

import styles from "./Course.module.css";
import { useRecords } from "../../contexts/RecordsContext.jsx";
import BackButton from "../../components/global-components/BackButton/BackButton.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ThresholdPoints from "../../components/pages-components/Course/ThresholdPoints/ThresholdPoints.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Summary from "../../components/pages-components/Course/Summary/Summary.jsx";
import AddNewRuleForTask from "../../components/pages-components/Course/AddNewRuleForTask/AddNewRuleForTask.jsx";

const Transition = forwardRef(function Transition(props, _) {
  return <Slide {...props} />;
});

function formatTime(params) {
  if (!params) return "";
  const locale = navigator.language || "en-US";

  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(params));
}

export default function Course() {
  const [modalData, setModalData] = useState(null);

  const { user } = useAuth();
  const { isLoading, recordsData, setChangedRecordData, changedRecordData } =
    useRecords();

  const { taskId } = useParams();
  const navigate = useNavigate();

  const records = recordsData?.records;
  const isAdmin = user?.isAdmin;

  useEffect(() => {
    setChangedRecordData(null);
  }, [setChangedRecordData, recordsData]);

  async function showAddNewRecord() {
    const dataForAddedRecord = await sendAPI(
      "GET",
      `${baseUrl}/records/get-automatic-data/${taskId}`
    );

    setChangedRecordData({
      ...dataForAddedRecord.data,
      editId: null,
    });
  }

  const handleStartEdit = useCallback(
    async (e, id) => {
      e.stopPropagation();
      const record = records.find((record) => record._id === id);
      const dataForEditedRecord = await sendAPI(
        "GET",
        `${baseUrl}/records/get-automatic-data/${taskId}?recordId=${record._id}`
      );

      setChangedRecordData({
        ...dataForEditedRecord.data,
        editId: record._id,
      });
    },
    [records, taskId, setChangedRecordData]
  );

  function handleCellClick(params) {
    if (!params.value || params.value.length === 0) {
      const record = params.row;

      if (!isAdmin && record.isTimeTakenMovable) navigate(`timer/${record.id}`);
      else if (isAdmin && record.isResultsMovable)
        navigate(`results/${record.id}`);
    } else setModalData(params.formattedValue);
  }

  const rows = useMemo(
    function () {
      return recordsData?.records?.map((record, index) => {
        return {
          ...record,
          number: index + 1,
        };
      });
    },
    [recordsData]
  );

  const columns = useMemo(
    function () {
      return [
        {
          field: "number",
          headerName: "No.",
          flex: 1,
          renderCell: (params) => {
            if (
              isAdmin &&
              params.row?.isEditable &&
              params.id !== changedRecordData?.editId
            )
              return (
                <Box className={styles.number}>
                  <Button
                    className={styles.editButton}
                    onClick={(e) => handleStartEdit(e, params.id)}
                  >
                    <EditIcon />
                  </Button>
                  {params.value}
                </Box>
              );
            else return params.value;
          },
        },
        {
          field: "date",
          headerName: "Dates",
          flex: 1,
          valueFormatter: (params) => {
            const locale = navigator.language || "en-US";
            const date = new Date(params);

            return new Intl.DateTimeFormat(locale, {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(date);
          },
        },
        { field: "formattedWork", headerName: "Works", flex: 1 },
        {
          field: "startTime",
          headerName: "Start Times",
          flex: 1,
          valueFormatter: formatTime,
        },
        {
          field: "endTime",
          headerName: "End Times",
          flex: 1,
          valueFormatter: formatTime,
        },
        {
          field: "timeTaken",
          headerName: "Times Taken",
          flex: 1,
          valueFormatter: displayTimeTaken,
        },
        { field: "formattedResult", headerName: "Results", flex: 1 },
        { field: "comment", headerName: "Comments", flex: 1 },
        { field: "formattedGrade", headerName: "Grades", flex: 1 },
      ];
    },
    [isAdmin, handleStartEdit, changedRecordData?.editId]
  );

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Header>
            {isAdmin && recordsData?.rule && (
              <Box className={styles.ruleLinks}>
                <Link
                  to={`/rules/see-rule/${recordsData.rule}`}
                  className="btn"
                >
                  Manage Rules for this Task
                </Link>
                <Link to="existing-rule-categories" className="btn">
                  See Existing Rule Categories
                </Link>
              </Box>
            )}
            {isAdmin && !recordsData?.rule && <AddNewRuleForTask />}
            <Box>
              <Box>{recordsData?.taskName}</Box>
              <ThresholdPoints isAdmin={isAdmin} />
            </Box>
          </Header>
          <Container className="dataGrid">
            <Summary />
            <Box className={styles.outlet}>
              <Outlet />
            </Box>
            <BackButton url="/home" />
            <Box className={styles.taskNavigation}>
              <Box>
                {recordsData?.previousTask ? (
                  <Link
                    to={`/course/${recordsData?.previousTask}`}
                    className={`btn ${styles.previousTask}`}
                  >
                    <ArrowBackIcon />
                    Previous Task
                  </Link>
                ) : (
                  <Box />
                )}
              </Box>
              <Box>
                {recordsData?.nextTask && (
                  <Link
                    to={`/course/${recordsData?.nextTask}`}
                    className={`btn ${styles.nextTask}`}
                  >
                    <ArrowForwardIcon />
                    Next Task
                  </Link>
                )}
              </Box>
            </Box>
            {isAdmin && !changedRecordData && (
              <Button className="btn" onClick={showAddNewRecord}>
                Add New Record
              </Button>
            )}
            {changedRecordData && <ChangedRecord taskId={taskId} />}
            <DataGrid
              rows={rows}
              columns={columns}
              autoPageSize={false}
              onCellClick={handleCellClick}
            />
          </Container>
          <Dialog
            slots={{ transition: Transition }}
            slotProps={{ transition: { direction: "right" } }}
            open={modalData !== null}
            onClose={() => setModalData(null)}
            className={styles.modal}
          >
            <Box className={styles.modalText}>{modalData}</Box>
          </Dialog>
          <Footer />
        </>
      )}
    </>
  );
}
