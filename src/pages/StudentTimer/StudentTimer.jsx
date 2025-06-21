import { useState } from "react";
import { sendAPI } from "../../utils/helpers";
import { baseUrl } from "../../utils/config";
import StartButton from "../../components/pages-components/StudentTimer/StartButton/StartButton";
import Stop from "../../components/pages-components/StudentTimer/Stop/Stop";
import { Table, TableContainer, TableBody, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import styles from "./StudentTimer.module.css";
import StartTime from "../../components/pages-components/StudentTimer/StartTime/StartTime";
import Spinner from "../../components/global-components/Spinner/Spinner";
import InfoCard from "../../components/global-components/InfoCard/InfoCard";
import { useRecords } from "../../contexts/RecordsContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";

function StudentTimer() {
  const { taskId, recordId } = useParams();

  const navigate = useNavigate();

  const [hasStarted, setHasStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);

  const { isLoading, setIsLoading, setRecordsData, recordsData } = useRecords();
  const { user } = useAuth();

  const record = recordsData?.records?.find(
    (record) => record._id === recordId
  );

  function handleClickPlayPauseButton() {
    if (!hasStarted) setStartTime(new Date());
    setHasStarted(true);
  }

  async function handleStopTime() {
    setHasStarted(false);
    setIsLoading(true);
    const dateStartTime = new Date(startTime);
    const dateEndTime = new Date();
    const newRecordsData = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-or-create-record/${taskId}/${recordId}`,
      {
        startTime: dateStartTime,
        endTime: dateEndTime,
      }
    );
    setRecordsData(newRecordsData.data);
    setIsLoading(false);
    navigate(`/course/${taskId}`);
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Box className={styles.container}>
            {user.isAdmin ? (
              <Box className={styles.adminMessage}>
                You are not allowed to access this page as an admin.
              </Box>
            ) : (
              <>
                <InfoCard>
                  Work: {record?.formattedWork}
                  <br />
                  <br />
                  <br />
                  Date:{" "}
                  {new Date(record?.date)?.toLocaleDateString(
                    Intl.DateTimeFormat().resolvedOptions().locale
                  )}
                </InfoCard>

                <TableContainer className="table">
                  <Table>
                    <TableBody>
                      <StartButton
                        hasStarted={hasStarted}
                        onClickPlayPauseButton={handleClickPlayPauseButton}
                      />
                      <Stop
                        hasStarted={hasStarted}
                        onStopTime={handleStopTime}
                      />
                      <StartTime startTime={startTime} />
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default StudentTimer;
