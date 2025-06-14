import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import sharedStyles from "../shared.module.css";

function ChangedRuleCategory({
  onSaveRuleCategory,
  defaultRuleCategory,
  handleStopRuleCategoryShowing,
  index,
}) {
  const [inputValue, setInputValue] = useState("");

  const addRuleCategoryInput = useRef(null);

  useEffect(function () {
    addRuleCategoryInput.current?.focus();
  }, []);

  useEffect(
    function () {
      setInputValue(defaultRuleCategory);
    },
    [defaultRuleCategory]
  );

  return (
    <>
      <TextField
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        ref={addRuleCategoryInput}
        className={sharedStyles.ruleInputsTextField}
      />
      <Button
        onClick={() => {
          handleStopRuleCategoryShowing();
          onSaveRuleCategory(inputValue, index);
        }}
      >
        Save
      </Button>
    </>
  );
}

export default ChangedRuleCategory;
