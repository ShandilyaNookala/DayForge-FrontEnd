import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import sharedStyles from "../shared.module.css";

function ChangedRuleInput({
  onSaveRuleInput,
  defaultRuleInputId = null,
  ruleCategoryPoints = "",
  defaultRuleInput = "",
  defaultIsAddingRuleInput = true,
  defaultPoints = "",
  handleStopShowing,
}) {
  const ruleInputRef = useRef(null);
  const [ruleInputValue, setRuleInputValue] = useState(defaultRuleInput);
  const [points, setPoints] = useState(defaultPoints || ruleCategoryPoints);

  useEffect(
    function () {
      ruleInputRef.current?.focus();
    },
    [ruleInputRef]
  );

  useEffect(
    function () {
      if (ruleCategoryPoints) setPoints(ruleCategoryPoints);
    },
    [ruleCategoryPoints]
  );

  useEffect(
    function () {
      if (defaultPoints) setPoints(defaultPoints);
    },
    [defaultPoints]
  );

  return (
    <Box>
      <Box>
        Rule input:
        <TextField
          value={ruleInputValue}
          onChange={(e) => setRuleInputValue(e.target.value)}
          ref={ruleInputRef}
          minRows={3}
          className={sharedStyles.ruleInputsTextField}
        />
      </Box>
      <Box>
        No. of Points:
        <TextField
          value={points}
          onChange={(e) => {
            if (!Number(e.target.value)) setPoints(0);
            setPoints(+e.target.value);
          }}
          className={sharedStyles.ruleInputsTextField}
        />
        <Button
          onClick={() => {
            handleStopShowing();
            onSaveRuleInput(
              ruleInputValue,
              points,
              defaultRuleInputId,
              defaultIsAddingRuleInput
            );
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default ChangedRuleInput;
