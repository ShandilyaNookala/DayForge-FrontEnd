import { Box, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./Mistakes.module.css";

function Mistakes({ mistakes, dispatch }) {
  if (!Array.isArray(mistakes)) return null;

  return (
    <Box className={styles.list}>
      {mistakes.map((mistake) => (
        <Box key={mistake.id} className={styles.row}>
          <FormControlLabel
            control={
              <Checkbox
                checked={mistake.checked}
                onChange={() =>
                  dispatch({ type: "changeMistake", payload: mistake.id })
                }
                className={styles.checkbox}
              />
            }
            label={
              <Box
                component="span"
                className={`${styles.label} ${styles.name}`}
              >
                {mistake.name}
              </Box>
            }
          />

          {mistake.checked && (
            <Box className={styles.repeat}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mistake.shouldRepeat}
                    onChange={() =>
                      dispatch({
                        payload: mistake.id,
                        type: "toggleShouldRepeat",
                      })
                    }
                    className={styles.checkbox}
                  />
                }
                label={
                  <Box component="span" className={styles.label}>
                    Should Repeat
                  </Box>
                }
              />
            </Box>
          )}
          {mistake.shouldRepeat && mistake.checked && (
            <Box className={styles.repeat}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mistake.addMistakes}
                    onChange={() =>
                      dispatch({
                        payload: mistake.id,
                        type: "toggleAddMistakes",
                      })
                    }
                    className={styles.checkbox}
                  />
                }
                label={
                  <Box component="span" className={styles.label}>
                    Add mistakes
                  </Box>
                }
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}

export default Mistakes;
