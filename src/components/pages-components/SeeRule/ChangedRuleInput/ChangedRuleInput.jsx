import { Button, TextField } from "@mui/material";
import { useState } from "react";
import sharedStyles from "../shared.module.css";

function ChangedRuleInput({
  ruleInput = null,
  standardPoints = null,
  onSaveRuleInput,
}) {
  const [ruleInputValue, setRuleInputValue] = useState(ruleInput?.name || "");
  const [ruleInputPoints, setRuleInputPoints] = useState(
    ruleInput?.points || standardPoints
  );

  async function handleSaveRuleInput() {
    if (!ruleInputValue) {
      alert("Please enter a rule input name.");
      return;
    }
    if (ruleInputPoints <= 0) {
      alert("Points must be positive.");
      return;
    }
    await onSaveRuleInput(ruleInput?._id, ruleInputValue, ruleInputPoints);
  }

  return (
    <>
      <TextField
        value={ruleInputValue}
        onChange={(e) => setRuleInputValue(e.target.value)}
        label="Rule Input Name"
        className={sharedStyles.ruleTextField}
      />
      <TextField
        type="number"
        value={ruleInputPoints}
        onChange={(e) => setRuleInputPoints(e.target.value)}
        label="Points"
        className={sharedStyles.ruleTextField}
      />
      <Button onClick={handleSaveRuleInput}>Save</Button>
    </>
  );
}

export default ChangedRuleInput;
