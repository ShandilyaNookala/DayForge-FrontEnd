import { Edit } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import sharedStyles from "../shared.module.css";
import styles from "./RuleInput.module.css";
import ChangedRuleInput from "../ChangedRuleInput/ChangedRuleInput";

function RuleInput({ ruleInput, onSaveRuleInput }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleEditRuleInput(...params) {
    await onSaveRuleInput(...params);
    setIsEditing(false);
  }

  return (
    <Box className={styles.container}>
      {isEditing ? (
        <ChangedRuleInput
          ruleInput={ruleInput}
          onSaveRuleInput={handleEditRuleInput}
        />
      ) : (
        <>
          <Typography className={`${sharedStyles.typography} ${styles.text}`}>
            {ruleInput.name} — {ruleInput.points} pts
          </Typography>
          <Button
            size="small"
            className={styles.editBtn}
            onClick={() => setIsEditing(true)}
          >
            <Edit fontSize="small" />
          </Button>
        </>
      )}
    </Box>
  );
}

export default RuleInput;
