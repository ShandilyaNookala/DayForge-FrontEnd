import { Box, TextField } from "@mui/material";
import styles from "./TextResults.module.css";
function TextResults({ value, dispatch, type }) {
  return (
    <Box className={styles.container}>
      <TextField
        multiline
        rows={2}
        className={styles.commentsTextField}
        value={value || ""}
        onChange={(e) =>
          dispatch({ type: `${type}ValText`, payload: e.target.value })
        }
      />
    </Box>
  );
}

export default TextResults;
