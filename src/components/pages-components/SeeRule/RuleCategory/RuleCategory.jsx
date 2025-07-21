import { Box, Button, TextField, Typography } from "@mui/material";
import RuleInput from "../RuleInput/RuleInput";
import { useState } from "react";
import { Edit } from "@mui/icons-material";
import sharedStyles from "../shared.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import ChangedRuleCategory from "../ChangedRuleCategory/ChangedRuleCategory";
import { sendAPI } from "../../../../utils/helpers";
import { baseUrl } from "../../../../utils/config";

function RuleCategory({
  ruleCategory,
  ruleInputs,
  onEditRuleCategory,
  onSaveRuleInput,
  ruleId,
  setRule,
  setIsLoading,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingRuleInput, setIsAddingRuleInput] = useState(false);
  const [standardPoints, setStandardPoints] = useState(0);
  const [bulkEditPoints, setBulkEditPoints] = useState(0);

  async function handleEditRuleCategory(...params) {
    await onEditRuleCategory(...params);
    setIsEditing(false);
  }

  async function handleSaveRuleInput(...params) {
    await onSaveRuleInput(...params, ruleCategory._id);
    setIsAddingRuleInput(false);
  }

  async function handleSaveBulkEditPoints() {
    if (bulkEditPoints < 0) {
      alert("Points cannot be negative.");
      return;
    }
    setIsLoading(true);
    const rule = await sendAPI(
      "PATCH",
      `${baseUrl}/rules/${ruleId}/bulk-edit-points/${ruleCategory._id}`,
      {
        bulkEditPoints,
      }
    );
    setRule(rule.data);
    setBulkEditPoints(0);
    setIsLoading(false);
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
          <TextField
            label="Bulk Edit Points"
            className={sharedStyles.ruleTextField}
            value={bulkEditPoints}
            onChange={(e) => setBulkEditPoints(e.target.value)}
          />
          <Button onClick={handleSaveBulkEditPoints}>Save</Button>
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
