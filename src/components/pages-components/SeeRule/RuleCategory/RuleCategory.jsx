import { Box, Button, TextField, Typography } from "@mui/material";
import RuleInput from "../RuleInput/RuleInput";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import sharedStyles from "../shared.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import ChangedRuleCategory from "../ChangedRuleCategory/ChangedRuleCategory";

function RuleCategory({
  ruleCategory,
  ruleInputs,
  onEditRuleCategory,
  onSaveRuleInput,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingRuleInput, setIsAddingRuleInput] = useState(false);
  const [standardPoints, setStandardPoints] = useState(0);

  async function handleEditRuleCategory(...params) {
    await onEditRuleCategory(...params);
    setIsEditing(false);
  }

  async function handleSaveRuleInput(...params) {
    await onSaveRuleInput(...params, ruleCategory._id);
    setIsAddingRuleInput(false);
  }

  return (
    <Box>
      {!isEditing ? (
        <>
          <Typography variant="h4" className={sharedStyles.typography}>
            {ruleCategory.name}
          </Typography>
          <Button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <Edit />
          </Button>
          <TextField
            label="Standard Points"
            className={sharedStyles.ruleTextField}
            value={standardPoints}
            onChange={(e) => setStandardPoints(e.target.value)}
          />
        </>
      ) : (
        <ChangedRuleCategory
          ruleCategory={ruleCategory}
          onSaveRuleCategory={handleEditRuleCategory}
        />
      )}
      {ruleInputs.map((ruleInput) => (
        <RuleInput
          ruleInput={ruleInput}
          onSaveRuleInput={handleSaveRuleInput}
          key={ruleInput._id}
        />
      ))}
      {isAddingRuleInput ? (
        <ChangedRuleInput
          onSaveRuleInput={handleSaveRuleInput}
          standardPoints={standardPoints}
        />
      ) : (
        <Button onClick={() => setIsAddingRuleInput(true)}>
          + Add Rule Input
        </Button>
      )}
    </Box>
  );
}

export default RuleCategory;
