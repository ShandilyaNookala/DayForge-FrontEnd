import { useEffect, useRef } from "react";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

function WorkRules({ work, setWork, scrollContainerRef }) {
  const itemRefs = useRef([]);
  const initialScrollCountRef = useRef(0);

  useEffect(() => {
    if (!Array.isArray(work) || work.length === 0) return;
    if (initialScrollCountRef.current > 0) return;
    initialScrollCountRef.current += 1;
    const firstCheckedIndex = work.findIndex((eachWork) => eachWork.checked);
    if (firstCheckedIndex === -1) return;
    const element = itemRefs.current[firstCheckedIndex];
    const container = scrollContainerRef?.current;
    if (!element || !container) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetTop = elementRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  }, [work, scrollContainerRef]);
  function handleChangeCheckedStatus(newCheckedStatusValue, index) {
    setWork((work) =>
      work.map((checkedStatus, i) =>
        i === index
          ? { ...checkedStatus, checked: newCheckedStatusValue }
          : checkedStatus
      )
    );
  }
  return (
    <FormGroup>
      {work.map((eachRule, i) => {
        return (
          <Box key={eachRule.id} ref={(el) => (itemRefs.current[i] = el)}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={eachRule.checked}
                  onChange={(e) =>
                    handleChangeCheckedStatus(e.target.checked, i)
                  }
                />
              }
              label={eachRule.name}
            />
          </Box>
        );
      })}
    </FormGroup>
  );
}

export default WorkRules;
