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

    const newRecordsData = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-threshold-points/${taskId}`,
      {
        threshold,
        noOfProblems,
      }
    );
    setIsLoading(false);
    setRecordsData(newRecordsData.data);
  }

  async function updateRuleForTask(ruleId) {
    if (!ruleId) return;
    setIsLoading(true);

    const response = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-rule-for-task/${taskId}`,
      {
        ruleId,
      }
    );
    setIsLoading(false);

    setRecordsData(response.data);
  }

  async function updateSkippedRuleCategories(skippedCategoryIds) {
    setIsLoading(true);
    const response = await sendAPI(
      "PATCH",
      `${baseUrl}/records/update-skipped-rule-categories/${taskId}`,
      {
        skippedRuleCategories: skippedCategoryIds,
      }
    );
    setIsLoading(false);
    setRecordsData(response.data);
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
        updateRuleForTask,
        updateSkippedRuleCategories,
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
