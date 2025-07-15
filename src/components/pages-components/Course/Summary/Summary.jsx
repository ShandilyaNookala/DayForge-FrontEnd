import { Box, Stack } from "@mui/material";
import { useRecords } from "../../../../contexts/RecordsContext";
import styles from "./Summary.module.css";
import SummaryItem from "../SummaryItem/SummaryItem";

function Summary() {
  const { recordsData } = useRecords();

  if (!recordsData) return null;
  const { totalAttemptedProblems, totalProblems, mistakes, endDate } =
    recordsData;

  if (
    totalAttemptedProblems === null ||
    totalProblems === null ||
    mistakes === null
  )
    return null;

  const percentageCorrect = Math.floor(
    100 - (mistakes / totalAttemptedProblems) * 100
  );

  return (
    <Box className={styles.summaryContainer}>
      <Box className={styles.summaryBox}>
        <Stack spacing={1}>
          <SummaryItem label="Total Problems" value={totalProblems} />
          <SummaryItem
            label="Attempted Problems"
            value={totalAttemptedProblems}
          />
          <SummaryItem label="Mistakes" value={mistakes} />
          <SummaryItem
            label="Percentage Correct"
            value={`${percentageCorrect}%`}
          />
          <SummaryItem
            label="End Date"
            value={new Intl.DateTimeFormat(navigator.language || "en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }).format(new Date(endDate))}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default Summary;
