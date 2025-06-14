import { useState } from "react";
import RuleInput from "../RuleInput/RuleInput";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import ChangedRuleCategory from "../ChangedRuleCategory/ChangedRuleCategory";
import { TextField, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import sharedStyles from "../shared.module.css";

export default function RuleCategory({
  ruleCategoryName,
  ruleInputs,
  onSaveRuleInput,
  index,
  onSaveRuleCategory,
}) {
  const [ruleInputShowing, setRuleInputShowing] = useState(false);
  const [ruleCategoryPoints, setRuleCategoryPoints] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  function handleShowRuleInput() {
    setRuleInputShowing(true);
  }

  function handleSaveRuleInput(
    ruleInputValue,
    points,
    defaultRuleInputId,
    defaultIsAddingRuleInput
  ) {
    if (!ruleInputValue.trim()) {
      alert("Rule input cannot be empty");
      return;
    }
    if (!points || isNaN(points) || points <= 0) {
      alert("Points must be a positive number");
      return;
    }
    const newRuleInput = {
      name: ruleInputValue,
      type: ruleCategoryName,
      points,
      _id: defaultRuleInputId || crypto.randomUUID(),
      isAddingRuleInput: defaultIsAddingRuleInput,
    };
    onSaveRuleInput(newRuleInput);
  }

  return (
    <Box>
      <Box>
        {isEditing ? (
          <ChangedRuleCategory
            defaultRuleCategory={ruleCategoryName}
            handleStopRuleCategoryShowing={() => setIsEditing(false)}
            index={index}
            onSaveRuleCategory={onSaveRuleCategory}
          />
        ) : (
          <>
            {ruleCategoryName}
            <Button onClick={() => setIsEditing(true)}>
              <EditIcon />
            </Button>
          </>
        )}
        Standard Points:
        <TextField
          value={ruleCategoryPoints}
          onChange={(e) => {
            if (!Number(e.target.value)) setRuleCategoryPoints(0);
            else setRuleCategoryPoints(+e.target.value);
          }}
          className={sharedStyles.ruleInputsTextField}
        />
      </Box>
      <Box>
        {ruleInputs
          .filter(
            (ruleInput) => ruleInput.type === ruleCategoryName && ruleInput.name
          )
          .map((ruleInput, index) => (
            <RuleInput
              ruleInput={ruleInput}
              key={ruleInput.id || ruleInput._id || index}
              onSaveRuleInput={handleSaveRuleInput}
            />
          ))}
      </Box>
      {ruleInputShowing && (
        <ChangedRuleInput
          onSaveRuleInput={handleSaveRuleInput}
          ruleCategoryPoints={ruleCategoryPoints}
          handleStopShowing={() => setRuleInputShowing(false)}
        />
      )}
      <Button onClick={handleShowRuleInput}>+ Add Rule Input</Button>
    </Box>
  );
}
