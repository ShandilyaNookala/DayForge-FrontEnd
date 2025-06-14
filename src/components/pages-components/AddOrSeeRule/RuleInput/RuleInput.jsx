import { useState } from "react";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./RuleInput.module.css";

export default function RuleInput({ ruleInput, onSaveRuleInput }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <>
      {isEditing ? (
        <ChangedRuleInput
          defaultPoints={ruleInput.points}
          defaultRuleInput={ruleInput.name}
          onSaveRuleInput={onSaveRuleInput}
          handleStopShowing={() => setIsEditing(false)}
          defaultRuleInputId={ruleInput._id}
          defaultIsAddingRuleInput={ruleInput.isAddingRuleInput}
        />
      ) : (
        <Box className={styles.ruleInput}>
          Name: {ruleInput.name}, Points: {ruleInput.points}
          <Button onClick={() => setIsEditing(true)}>
            <EditIcon />
          </Button>
        </Box>
      )}
    </>
  );
}
