import { Edit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import sharedStyles from "../shared.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";

function RuleInput({ ruleInput, onSaveRuleInput }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleEditRuleInput(...params) {
    await onSaveRuleInput(...params);
    setIsEditing(false);
  }

  return (
    <Box>
      {isEditing ? (
        <ChangedRuleInput
          ruleInput={ruleInput}
          onSaveRuleInput={handleEditRuleInput}
        />
      ) : (
        <>
          <Typography variant="p" className={sharedStyles.typography}>
            Name: {ruleInput.name}, Points: {ruleInput.points}
          </Typography>
          <Button onClick={() => setIsEditing(true)}>
            <Edit />
          </Button>
        </>
      )}
    </Box>
  );
}

export default RuleInput;
