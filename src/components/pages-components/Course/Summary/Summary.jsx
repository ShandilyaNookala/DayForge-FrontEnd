import { Box } from "@mui/material";
import { useRecords } from "../../../../contexts/RecordsContext";
import styles from "./Summary.module.css";
import SummaryItem from "../SummaryItem/SummaryItem";

function Summary() {
  const { recordsData } = useRecords();
  if (!recordsData) return null;

  const {
    totalAttemptedProblems,
    totalProblems,
    mistakes,
    endDate,
    percentageCorrect,
    totalPoints,
    totalPointsAttempted,
    mistakePoints,
  } = recordsData;

  if (
    totalAttemptedProblems === null ||
    totalProblems === null ||
    mistakes === null
  )
    return null;

  return (
    <Box className={styles.summaryContainer}>
      <Box className={styles.summaryBox}>
        <SummaryItem label="Total Problems" value={totalProblems} />
        <SummaryItem label="Att. Problems" value={totalAttemptedProblems} />
        <SummaryItem label="Mistakes" value={mistakes} />
        <SummaryItem
          label="Total Points"
          value={+totalPoints.toFixed(10)}
          isPoints
        />
        <SummaryItem
          label="Att. Points"
          value={+totalPointsAttempted.toFixed(10)}
          isPoints
        />
        <SummaryItem
          label="Mistake Points"
          value={+mistakePoints.toFixed(10)}
          isPoints
        />
      </Box>
      <Box className={styles.highlightBar}>
        <Box className={styles.highlightItem}>
          <span className={styles.highlightValue}>
            Percentage Correct:{" "}
            {totalAttemptedProblems > 0
              ? `${Math.round(percentageCorrect)}%`
              : "N/A"}
          </span>
        </Box>
        <span className={styles.divider}>|</span>
        <Box className={styles.highlightItem}>
          <span className={styles.highlightValue}>
            End Date:{" "}
            {endDate
              ? new Intl.DateTimeFormat(navigator.language || "en-US", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).format(new Date(endDate))
              : "N/A"}
          </span>
        </Box>
      </Box>
    </Box>
  );
}

export default Summary;
