import TextResults from "../TextResults/TextResults";
import { Box, Checkbox } from "@mui/material";
import styles from "./NextWork.module.css";

function NextWork({ nextWork, dispatch }) {
  return (
    <Box className={styles.container}>
      <Box>
        {!Array.isArray(nextWork) ? (
          <TextResults value={nextWork} dispatch={dispatch} type="nextWork" />
        ) : (
          nextWork.map((work, i) => (
            <Box key={work.id}>
              <Checkbox
                checked={work.checked}
                onChange={() =>
                  dispatch({ type: "changeNextWork", payload: i })
                }
              />
              <Box component="label" className={styles.label}>
                {work.name}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default NextWork;
