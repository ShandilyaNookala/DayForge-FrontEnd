import { Box, CircularProgress } from "@mui/material";
import styles from "./Spinner.module.css";

function Spinner() {
  return (
    <Box className={styles.spinnerContainer}>
      <CircularProgress className={styles.spinner} />
    </Box>
  );
}

export default Spinner;
