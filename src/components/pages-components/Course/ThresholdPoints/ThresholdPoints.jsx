import { Box, Button, TextField } from "@mui/material";
import { useRecords } from "../../../../contexts/RecordsContext";
import { useState } from "react";
import styles from "./ThresholdPoints.module.css";

function ThresholdPoints({ isAdmin }) {
  const { recordsData, updateThresholdPoints } = useRecords();

  const [threshold, setThreshold] = useState(recordsData?.threshold);
  const [noOfProblems, setNoOfProblems] = useState(recordsData?.noOfProblems);

  if (!recordsData?.rule || !isAdmin) return null;

  function handleChange(e, setterFunction) {
    const val = e.target.value;
    if (/^\d*\.?\d*$/.test(val)) {
      setterFunction(val);
    }
  }

  return (
    <Box className={styles.thresholdPointsContainer}>
      <TextField
        label="Threshold"
        value={threshold}
        type="number"
        onChange={(e) => handleChange(e, setThreshold)}
        className="default-text-field"
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <TextField
        label="Number of Points"
        value={noOfProblems}
        type="number"
        onChange={(e) => handleChange(e, setNoOfProblems)}
        className="default-text-field"
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <Button onClick={() => updateThresholdPoints(threshold, noOfProblems)}>
        Save
      </Button>
    </Box>
  );
}

export default ThresholdPoints;
