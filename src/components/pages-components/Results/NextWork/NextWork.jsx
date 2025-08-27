import { useEffect, useRef } from "react";
import TextResults from "../TextResults/TextResults";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import styles from "./NextWork.module.css";

function NextWork({ nextWork, dispatch }) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const initialScrollCountRef = useRef(0);

  useEffect(() => {
    if (!Array.isArray(nextWork) || nextWork.length === 0) return;
    if (initialScrollCountRef.current > 0) return;
    initialScrollCountRef.current += 1;
    const firstCheckedIndex = nextWork.findIndex((work) => work.checked);
    if (firstCheckedIndex === -1) return;

    const element = itemRefs.current[firstCheckedIndex];
    const container = containerRef.current;
    if (!element || !container) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetTop = elementRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [nextWork]);

  return (
    <Box className={styles.container} ref={containerRef}>
      <Box>
        {!Array.isArray(nextWork) ? (
          <TextResults value={nextWork} dispatch={dispatch} type="nextWork" />
        ) : (
          nextWork.map((work, i) => (
            <Box key={work.id}>
              <FormControlLabel
                ref={(el) => (itemRefs.current[i] = el)}
                control={
                  <Checkbox
                    checked={work.checked}
                    onChange={() =>
                      dispatch({ type: "changeNextWork", payload: i })
                    }
                  />
                }
                label={<span className={styles.label}>{work.name}</span>}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

export default NextWork;
