import { Box, Typography } from "@mui/material";
import styles from "./SummaryItem.module.css";

function SummaryItem({ label, value }) {
  return (
    <Box className={styles.summaryItem}>
      <Typography variant="body1">{label}:</Typography>
      <Typography variant="body1" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  );
}

export default SummaryItem;
