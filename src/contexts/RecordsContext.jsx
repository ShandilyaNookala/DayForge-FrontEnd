import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { sendAPI } from "../utils/helpers";
import { baseUrl } from "../utils/config";

const RecordsContext = createContext();

function RecordsProvider({ children }) {
  const { taskId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [recordsData, setRecordsData] = useState(null);
  const [changedRecordData, setChangedRecordData] = useState(null);

  useEffect(
    function () {
      async function getRecord() {
        setIsLoading(true);
        try {
          const recordsData = (
            await sendAPI("GET", `${baseUrl}/records/${taskId}`)
          ).data;
          if (!recordsData) {
            setRecordsData([]);
          }
          setIsLoading(false);
          setRecordsData(recordsData);
        } catch (err) {
          console.error("Error fetching records data:", err);
          setRecordsData(null);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      }
      if (taskId) getRecord();
    },
    [taskId]
  );

  async function updateThresholdPoints(threshold, noOfProblems) {
    if (!noOfProblems) return;
    if (
      recordsData.threshold === threshold &&
      recordsData.noOfProblems === noOfProblems
    )
      return;
    setIsLoading(true);

    await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-threshold-points/${taskId}`,
      {
        threshold,
        noOfProblems,
      }
    );
    setIsLoading(false);
    setRecordsData((recordsData) => {
      return {
        ...recordsData,
        threshold,
        noOfProblems,
      };
    });
  }

  return (
    <RecordsContext.Provider
      value={{
        isLoading,
        recordsData,
        changedRecordData,
        setRecordsData,
        setIsLoading,
        setChangedRecordData,
        updateThresholdPoints,
      }}
    >
      {children}
    </RecordsContext.Provider>
  );
}

function useRecords() {
  const records = useContext(RecordsContext);
  if (!records) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return records;
}

export { RecordsProvider, useRecords };
